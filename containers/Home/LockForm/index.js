
import { memo } from 'react'

import { useContracts } from 'contexts/contract-context'
import CardWrapper from '../CardWrapper'
import CreateLock from './CreateLock'

const LockForm = () => {
  const {
    lockedAmount,
    isExpired,
  } = useContracts();

  return (
    <CardWrapper title='Lock Snowballs for xSNOB'>
      {!+(lockedAmount?.toString() || 0)
        ? (<CreateLock />)
        : isExpired
          ? ('Withdraw')
          : (
            <>
              IncreaseAmount
              IncreaseTime
            </>
          )
      }
    </CardWrapper>
  )
}

export default memo(LockForm)