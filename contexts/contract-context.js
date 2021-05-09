import { createContext, useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

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
        // * commented by great dolphin
        // const [
        //   lockStats,
        //   balance,
        //   totalSupply,
        //   totalLocked,
        // ] = await Promise.all([
        //   snowconeContract.locked(account),
        //   snowconeContract.balanceOf(account, { gasLimit: 1000000 }),
        //   snowconeContract.totalSupply({ gasLimit: 1000000 }),
        //   snowconeContract.supply({ gasLimit: 1000000 }),
        // ]);
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
        snowballBalance
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
    snowballBalance
  } = context

  return {
    snowballBalance
  }
}