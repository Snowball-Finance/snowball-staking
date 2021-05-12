
import { memo } from 'react'
import { Grid } from '@material-ui/core'

import { useContracts } from 'contexts/contract-context'
import HomeHeader from './HomeHeader'
import SnowBalance from './SnowBalance'
import Unlocked from './Unlocked'
import TotalLocked from './TotalLocked'
import LockForm from './LockForm'
import SnowLoading from 'components/SnowLoading'

const Home = () => {
  const { loading } = useContracts();

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
        <Grid item xs={12}>
          <LockForm />
        </Grid>
      </Grid>
    </>
  )
}

export default memo(Home)