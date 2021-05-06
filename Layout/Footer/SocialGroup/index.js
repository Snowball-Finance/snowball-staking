import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TelegramIcon from 'components/Icons/TelegramIcon'
import TwitterIcon from 'components/Icons/TwitterIcon'
import MediumIcon from 'components/Icons/MediumIcon'
import DiscordIcon from 'components/Icons/DiscordIcon'
import DOCIcon from 'components/Icons/DOCIcon'

const useStyles = makeStyles((theme) => ({
  group: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center'
  },
  socialIcon: {
    margin: theme.spacing(1, 3)
  }
}));

const SocialGroup = () => {
  const classes = useStyles();

  return (
    <div className={classes.group}>
      <TelegramIcon className={classes.socialIcon} />
      <TwitterIcon className={classes.socialIcon} />
      <MediumIcon className={classes.socialIcon} />
      <DiscordIcon className={classes.socialIcon} />
      <DOCIcon className={classes.socialIcon} />
    </div>
  );
};

export default memo(SocialGroup);
