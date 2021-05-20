
import { memo } from 'react'
import { Grid, Typography } from '@material-ui/core'

import { useContracts } from 'contexts/contract-context'
import SnowLoading from 'components/SnowLoading'
import HomeHeader from './HomeHeader'
import SnowBalance from './SnowBalance'
import Unlocked from './Unlocked'
import TotalLocked from './TotalLocked'
import LockForm from './LockForm'
import SnowVote from './SnowVote'

const Home = () => {
  const { loading, isWrongNetwork } = useContracts();

  return (
    <>
      {loading && <SnowLoading loading={loading} />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HomeHeader />
        </Grid>
        <Grid item xs={12} md={3}>
          <SnowBalance />
        </Grid>
        <Grid item xs={12} md={5}>
          <Unlocked />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalLocked />
        </Grid>
        {isWrongNetwork
          ? (
            <Grid item xs={12}>
              <Typography variant='body1' color='textSecondary'>
                Please switch to Avalanche Chain.
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <LockForm />
              </Grid>
              <Grid item xs={12}>
                <SnowVote />
              </Grid>
            </>
          )}
      </Grid>
    </>
  )
}

export default memo(Home)