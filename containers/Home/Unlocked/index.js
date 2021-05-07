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

const Unlocked = () => {
  const classes = useStyles();

  return (
    <CardWrapper title='Unlocked'>
      <div className={classes.content}>
        <Typography
          variant='h6'
          color='textSecondary'
        >
          0
        </Typography>
        <CoinIcon className={classes.coin} />
        <Typography
          variant='h6'
          color='textSecondary'
        >
          = 0 xSNOB
        </Typography>
      </div>
    </CardWrapper>
  )
}

export default memo(Unlocked)
