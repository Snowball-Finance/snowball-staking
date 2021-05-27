import { useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import {
  CONTRACTS,
  C_CHAIN_ID
} from 'config'
import {
  GAUGE_PROXY_ABI,
  SNOWBALL_ABI,
  SNOWCONE_ABI,
  FEE_DISTRIBUTOR_ABI
} from 'libs/abis'
import { usePopup } from 'contexts/popup-context'

const useSnowContracts = () => {
  const { setPopUp } = usePopup();
  const { library, chainId, account } = useWeb3React();

  const [gaugeProxyContract, setGaugeProxyContract] = useState();
  const [snowballContract, setSnowballContract] = useState();
  const [snowconeContract, setSnowconeContract] = useState();
  const [feeDistributorContract, setFeeDistributorContract] = useState();

  const isWrongNetwork = useMemo(() => chainId !== C_CHAIN_ID, [chainId])

  useEffect(() => {
    const getContacts = async () => {
      try {
        const gaugeProxyContract = new ethers.Contract(CONTRACTS.GAUGE_PROXY, GAUGE_PROXY_ABI, library.getSigner());
        setGaugeProxyContract(gaugeProxyContract)

        const snowballContract = new ethers.Contract(CONTRACTS.SNOWBALL, SNOWBALL_ABI, library.getSigner());
        setSnowballContract(snowballContract)

        const feeDistributorContract = new ethers.Contract(CONTRACTS.FEE_DISTRIBUTOR, FEE_DISTRIBUTOR_ABI, library.getSigner());
        setFeeDistributorContract(feeDistributorContract)

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
  }, [account, library, chainId]);

  return {
    isWrongNetwork,
    gaugeProxyContract,
    snowballContract,
    snowconeContract,
    feeDistributorContract
  }
}

export default useSnowContracts