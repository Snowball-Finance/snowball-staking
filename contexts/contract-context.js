import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import CoinGecko from 'coingecko-api'
import { parseEther } from 'ethers/lib/utils'

import {
  CONTRACTS,
  C_CHAIN_ID
} from 'config'
import SNOWBALL_ABI from 'libs/abis/snowball.json'
import SNOWCONE_ABI from 'libs/abis/snowcone.json'
import { usePopup } from 'contexts/popup-context'
import { isEmpty } from 'utils/helpers/utility'
import { getEpochSecondForDay } from 'utils/helpers/date';

const ContractContext = createContext(null)

export function ContractProvider({ children }) {
  const { setPopUp } = usePopup();
  const { library, chainId, account } = useWeb3React();

  const [snowballContract, setSnowballContract] = useState();
  const [snowconeContract, setSnowconeContract] = useState();
  const [snowballBalance, setSnowballBalance] = useState(0);
  const [lockedAmount, setLockedAmount] = useState();
  const [lockEndDate, setLockEndDate] = useState();
  const [snowconeBalance, setSnowconeBalance] = useState();
  const [totalSupply, setTotalSupply] = useState(0);
  const [totalLocked, setTotalLocked] = useState(0);
  const [prices, setPrices] = useState({});

  const lockedValue = useMemo(() => prices.snowball * parseFloat(ethers.utils.formatEther(totalSupply)), [prices, totalSupply])
  const totalSnowballValue = useMemo(() => prices.snowball * parseFloat(ethers.utils.formatEther(totalLocked)), [prices, totalLocked])

  useEffect(() => {
    const getPrices = async () => {
      const CoinGeckoClient = new CoinGecko();
      const { data: response } = await CoinGeckoClient.simple.price({
        ids: ['snowball-token'],
        vs_currencies: ['usd'],
      });

      const prices = { snowball: response['snowball-token']?.usd || 0 };
      setPrices(prices);
    };

    getPrices();
    setInterval(() => getPrices(), 120000);
  }, []);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const snowballContract = new ethers.Contract(CONTRACTS.SNOWBALL, SNOWBALL_ABI, library.getSigner());
        setSnowballContract(snowballContract)

        const snowconeContract = new ethers.Contract(CONTRACTS.SNOWCONE, SNOWCONE_ABI, library.getSigner());
        setSnowconeContract(snowconeContract)
      } catch (error) {
        console.error('error => ', error)
      }
    }

    if (!!chainId && chainId !== C_CHAIN_ID) {
      setPopUp({
        title: 'Network Error',
        text: `Switch to Avalanche Chain to stake`
      })
      return;
    }

    if (library) {
      getContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, chainId]);

  useEffect(() => {
    const getSnowballInfo = async () => {
      try {
        const latestSnowballBalance = await snowballContract.balanceOf(account);
        const snowballBalance = ethers.utils.formatUnits(latestSnowballBalance, 18);
        setSnowballBalance(snowballBalance);
      } catch (error) {
        console.log('[Error] snowballContract => ', error)
      }
    }

    if (!isEmpty(snowballContract)) {
      getSnowballInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snowballContract])

  useEffect(() => {
    const getSnowconeInfo = async () => {
      try {
        const [
          lockStats,
          snowconeBalance,
          totalSupply,
          totalLocked,
        ] = await Promise.all([
          snowconeContract.locked(account, { gasLimit: 1000000 }),
          snowconeContract['balanceOf(address)'](account, { gasLimit: 1000000 }),
          snowconeContract['totalSupply()']({ gasLimit: 1000000 }),
          snowconeContract['supply()']({ gasLimit: 1000000 }),
        ]);

        setLockedAmount(lockStats?.amount);
        setLockEndDate(lockStats?.end);
        setSnowconeBalance(snowconeBalance);
        setTotalSupply(totalSupply);
        setTotalLocked(totalLocked);
      } catch (error) {
        console.log('[Error] getSnowconeInfo => ', error)
      }
    }

    if (!isEmpty(snowconeContract)) {
      getSnowconeInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snowconeContract])

  const createLock = (data) => {
    snowconeContract.create_lock(
      parseEther((data.balance).toString()),
      getEpochSecondForDay(new Date(data.date)),
      { gasLimit: 600000 },
    );
  }

  return (
    <ContractContext.Provider
      value={{
        prices,
        snowballBalance,
        snowconeBalance,
        lockedAmount,
        lockEndDate,
        totalSupply,
        totalLocked,
        lockedValue,
        totalSnowballValue,
        createLock
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}

export function useContracts() {
  const context = useContext(ContractContext)
  if (!context) {
    throw new Error('Missing stats context')
  }

  const {
    prices,
    snowballBalance,
    snowconeBalance,
    lockedAmount,
    lockEndDate,
    totalSupply,
    totalLocked,
    lockedValue,
    totalSnowballValue,
    createLock
  } = context

  return {
    prices,
    snowballBalance,
    snowconeBalance,
    lockedAmount,
    lockEndDate,
    totalSupply,
    totalLocked,
    lockedValue,
    totalSnowballValue,
    createLock
  }
}