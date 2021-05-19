
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  }
}));

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Typography
        variant='h1'
        className={classes.title}
      >
        xSNOB
      </Typography>
      <Typography
        variant='body1'
        color='textSecondary'
      >
        Stake your Snowballs to receive a portion of the
        profits from Gauges.
      </Typography>
    </section>
  );
};

export default memo(HomeHeader);