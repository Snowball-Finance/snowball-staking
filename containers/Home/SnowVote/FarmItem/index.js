import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import { useContracts } from 'contexts/contract-context'
import LP_ICONS from 'utils/constants/lp-icons'
import SnowTextField from 'components/UI/SnowTextField'

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    objectFit: 'container'
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
}));

const FarmItem = () => {
  const classes = useStyles();
  const { } = useContracts();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} className={classes.imageContainer}>
        <img
          alt='lp-icon'
          src={LP_ICONS.uniswap}
          className={classes.image}
        />
        <div>
          <Typography color='textSecondary' variant='body1'>Pickle Power</Typography>
          <Typography color='textSecondary' variant='body1'>UNI PICKLE/ETH</Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className={classes.labelContainer}>
        <Typography color='textSecondary' variant='body1'>12.75%~28.83%</Typography>
        <Typography color='textSecondary' variant='body1'>Total APY range</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className={classes.labelContainer}>
        <Typography color='textSecondary' variant='body1'>10.72%~26.80%</Typography>
        <Typography color='textSecondary' variant='body1'>PICKLE APY</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} className={classes.labelContainer}>
        <Typography color='textSecondary' variant='body1'>{'8.09% -> 8.09%'}</Typography>
        <Typography color='textSecondary' variant='body1'>Current reward weight</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className={classes.labelContainer}>
        <SnowTextField
          type='number'
          name='percent'
          inputProps={{
            min: 0,
            max: 100
          }}
          endAdornment={'%'}
        />
      </Grid>
    </Grid>
  )
}

export default memo(FarmItem)
