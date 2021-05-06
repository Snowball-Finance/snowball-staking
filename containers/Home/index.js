
import { memo } from 'react'
import { Grid } from '@material-ui/core'

import HomeHeader from './HomeHeader'
import SnowBalance from './SnowBalance'
import Unlocked from './Unlocked'
import TotalLocked from './TotalLocked'

const Home = () => {
  return (
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
    </Grid>
  )
}

export default memo(Home)