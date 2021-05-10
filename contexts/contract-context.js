import { createContext, useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import CoinGecko from 'coingecko-api'

import {
  CONTRACTS,
  C_CHAIN_ID
} from 'config'
import SNOWBALL_ABI from 'libs/abis/snowball.json'
import SNOWCONE_ABI from 'libs/abis/snowcone.json'
import { usePopup } from 'contexts/popup-context'
import { isEmpty } from 'utils/helpers/utility'

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
  const [totalSupply, setTotalSupply] = useState(null);
  const [totalLocked, setTotalLocked] = useState(null);
  const [lockedValue, setLockedValue] = useState(null);
  const [totalSnowballValue, setTotalSnowballValue] = useState(null);
  const [prices, setPrices] = useState({});

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

        const totalLockedValue =
          prices.snowball * parseFloat(ethers.utils.formatEther(totalSupply));
        const totalSnowballValue =
          prices.snowball * parseFloat(ethers.utils.formatEther(totalLocked));

        setLockedAmount(lockStats?.amount);
        setLockEndDate(lockStats?.end);
        setSnowconeBalance(snowconeBalance);
        setTotalSupply(totalSupply);
        setTotalLocked(totalLocked);
        setLockedValue(totalLockedValue);
        setTotalSnowballValue(totalSnowballValue);
      } catch (error) {
        console.log('[Error] getSnowconeInfo => ', error)
      }
    }

    if (!isEmpty(snowconeContract)) {
      getSnowconeInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snowconeContract])

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
        totalSnowballValue
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
    totalSnowballValue
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
    totalSnowballValue
  }
}