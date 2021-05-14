import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import SnowTextField from 'components/UI/SnowTextField'
import { formatPercent, formatAPY } from 'utils/helpers/format'

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    objectFit: 'container',
    marginRight: theme.spacing(2)
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

const FarmItem = ({
  item
}) => {
  const classes = useStyles();
  const newWeight = 0;

  const pickleAPYMin = item.fullApy * 100 * 0.4;
  const pickleAPYMax = item.fullApy * 100;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} className={classes.imageContainer}>
        <img
          alt='lp-icon'
          src={item.icon}
          className={classes.image}
        />
        <div>
          <Typography color='textSecondary' variant='body1'>{item.poolName}</Typography>
          <Typography color='textSecondary' variant='body1'>{item.depositTokenName}</Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className={classes.labelContainer}>
        <Typography color='textSecondary' variant='body1'>
          {`${formatAPY(pickleAPYMin)} ~ ${formatAPY(pickleAPYMax)}`}
        </Typography>
        <Typography color='textSecondary' variant='body1'>
          Total APY range
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={2} className={classes.labelContainer}>
        <Typography color='textSecondary' variant='body1'>
          {`${formatAPY(pickleAPYMin)} ~ ${formatAPY(pickleAPYMax)}`}
        </Typography>
        <Typography color='textSecondary' variant='body1'>
          Snob APY
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} className={classes.labelContainer}>
        <Typography color='textSecondary' variant='body1'>
          {`${formatPercent(item.allocPoint)}% -> ${newWeight ? formatPercent(newWeight) : 0}%`}
        </Typography>
        <Typography color='textSecondary' variant='body1'>
          Current reward weight
        </Typography>
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
