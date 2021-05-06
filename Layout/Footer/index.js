
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'

import SocialGroup from './SocialGroup'
import { FOOTER_POWER_BY_IMAGE_PATH } from 'utils/constants/image-paths'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    margin: theme.spacing(1, 0)
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    }
  },
  powerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  powerImage: {
    width: 100,
    padding: theme.spacing(0, 1)
  },
}));

const Footer = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <footer className={classes.root}>
      <div className={clsx(classes.container, commonClasses.containerWidth)}>
        <div className={classes.powerContainer}>
          <Typography
            variant='body2'
            color='textPrimary'
          >
            Powered by
          </Typography>
          <img
            alt='power-by'
            src={FOOTER_POWER_BY_IMAGE_PATH}
            className={classes.powerImage}
          />
        </div>
        <SocialGroup />
      </div>
    </footer>
  );
};

export default memo(Footer);
