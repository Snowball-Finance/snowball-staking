import { memo } from 'react'
import { Grid, Typography } from '@material-ui/core'

const CalculatorPreview = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color='textSecondary' variant='body1'>
          Snowball boost factor: 1.000x
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color='textSecondary' variant='body1'>
          xSNOB required for max boost: 0.061
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color='textSecondary' variant='body1'>
          Snowball APY: 18.34%
        </Typography>
      </Grid>
    </Grid>
  )
}

export default memo(CalculatorPreview)
