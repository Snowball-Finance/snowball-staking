
import { memo } from 'react'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'unset'
  },
  title: {
    fontSize: 18,
    marginLeft: theme.spacing(1)
  }
}));

const Navigation = ({
  className
}) => {
  const classes = useStyles();

  return (
      <>
    <Link href={LINKS.STABLEVAULT.HREF}>
      <a className={clsx(classes.container, className)}>
        <Typography
          color='textSecondary'
          className={classes.title}
        >
          {LINKS.STABLEVAULT.TITLE}
        </Typography>
      </a>
    </Link>
    <Link href={LINKS.COMPOUND.HREF}>
    <a className={clsx(classes.container, className)}>
      <Typography
        color='textSecondary'
        className={classes.title}
      >
        {LINKS.COMPOUND.TITLE}
      </Typography>
    </a>
    </Link>
    <Link href={LINKS.EARN.HREF}>
    <a className={clsx(classes.container, className)}>
      <Typography
        color='textSecondary'
        className={classes.title}
      >
        {LINKS.EARN.TITLE}
      </Typography>
    </a>
    </Link>
    <Link href={LINKS.VOTE.HREF}>
    <a className={clsx(classes.container, className)}>
      <Typography
        color='textSecondary'
        className={classes.title}
      >
        {LINKS.VOTE.TITLE}
      </Typography>
    </a>
    </Link>
    <Link href={LINKS.NFT.HREF}>
    <a className={clsx(classes.container, className)}>
      <Typography
        color='textSecondary'
        className={classes.title}
      >
        {LINKS.NFT.TITLE}
      </Typography>
    </a>
    </Link>
    <Link href={LINKS.FAQ.HREF}>
    <a className={clsx(classes.container, className)}>
      <Typography
        color='textSecondary'
        className={classes.title}
      >
        {LINKS.FAQ.TITLE}
      </Typography>
    </a>
    </Link>
  </>
  )
}

export default memo(Navigation);
