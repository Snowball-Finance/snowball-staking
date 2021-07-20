import { createContext, useState, useContext } from 'react'

import useSnowContracts from 'utils/hooks/useSnowContracts'
import usePrices from 'utils/hooks/usePrices'
import useLock from 'utils/hooks/useLock'
import useClaim from 'utils/hooks/useClaim'
import useGauge from 'utils/hooks/useGauge'

const ContractContext = createContext(null)

export function ContractProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const { prices } = usePrices();
  const {
    isWrongNetwork,
    gaugeProxyContract,
    snowballContract,
    snowconeContract,
    feeDistributorContract,
  } = useSnowContracts()

  const {
    snowballBalance,
    snowconeBalance,
    lockedAmount,
    lockEndDate,
    totalSupply,
    totalLocked,
    lockedValue,
    totalSnowballValue,
    unlockTime,
    isLocked,
    isExpired,
    createLock,
    increaseAmount,
    increaseTime,
    withdraw
  } = useLock({
    prices,
    setLoading,
    snowballContract,
    snowconeContract
  })

  const {
    claim,
    userClaimable,
    distributionStatus,
  } = useClaim({
    setLoading,
    feeDistributorContract,
  })

  const { gauges, voteFarms } = useGauge({
    prices,
    gaugeProxyContract,
    setLoading
  })

  return (
    <ContractContext.Provider
      value={{
        isWrongNetwork,
        loading,
        prices,
        snowballBalance,
        snowconeBalance,
        lockedAmount,
        lockEndDate,
        totalSupply,
        totalLocked,
        lockedValue,
        totalSnowballValue,
        unlockTime,
        isLocked,
        isExpired,
        gauges,
        userClaimable,
        distributionStatus,
        claim,
        createLock,
        increaseAmount,
        increaseTime,
        withdraw,
        voteFarms
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
    isWrongNetwork,
    loading,
    prices,
    snowballBalance,
    snowconeBalance,
    lockedAmount,
    lockEndDate,
    totalSupply,
    totalLocked,
    lockedValue,
    totalSnowballValue,
    unlockTime,
    isLocked,
    isExpired,
    gauges,
    userClaimable,
    distributionStatus,
    claim,
    createLock,
    increaseAmount,
    increaseTime,
    withdraw,
    voteFarms
  } = context

  return {
    isWrongNetwork,
    loading,
    prices,
    snowballBalance,
    snowconeBalance,
    lockedAmount,
    lockEndDate,
    totalSupply,
    totalLocked,
    lockedValue,
    totalSnowballValue,
    unlockTime,
    isLocked,
    isExpired,
    gauges,
    userClaimable,
    distributionStatus,
    claim,
    createLock,
    increaseAmount,
    increaseTime,
    withdraw,
    voteFarms
  }
}