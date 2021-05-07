import { memo } from 'react'
import { Grid, Typography } from '@material-ui/core'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import CardWrapper from '../CardWrapper'

const SnowClaim = () => {

  return (
    <CardWrapper title='Claim'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='body1'>
            Weekly protocol revenue: $394,458.18
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='body1'>
            Projected weekly distribution (45% of revenue): $177,506.18
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='body1'>
            xSNOB holder APY: 283.41%
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='body1'>
            Next distribution: Wed May 12 2021
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='body1'>
            Last week{"'"}s distribution: $172,367.52 (8,843.90)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ContainedButton fullWidth>
            Claim 0 Snowballs
          </ContainedButton>
        </Grid>
      </Grid>
    </CardWrapper>
  )
}

export default memo(SnowClaim)
