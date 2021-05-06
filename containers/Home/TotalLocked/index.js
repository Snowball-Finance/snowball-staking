import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import CoinIcon from 'components/Icons/CoinIcon'
import CardWrapper from '../CardWrapper'
import theme from 'styles/theme'

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  coin: {
    margin: theme.spacing(0, 1)
  }
}));

const TotalLocked = () => {
  const classes = useStyles();

  return (
    <CardWrapper title='Total Locked'>
      <div className={classes.content}>
        <Typography
          variant='h6'
          color='textSecondary'
        >
          285, 283
        </Typography>
        <CoinIcon className={classes.coin} />
        <Typography
          variant='h6'
          color='textSecondary'
        >
          = $555, 390
        </Typography>
      </div>
    </CardWrapper>
  )
}

export default memo(TotalLocked)
