

import { memo } from 'react'
import Link from 'next/link'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import SOCIALS from 'utils/constants/social'

const useStyles = makeStyles(() => ({
  root: {
    width: 32,
    height: 32
  }
}));

const DOCIcon = ({
  className,
  viewBox,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Link
      href={SOCIALS.DOC.HREF}>
      <a aria-label={SOCIALS.DOC.LABEL} target='_blank' rel='noreferrer'>
        <SvgIcon viewBox={viewBox || '0 0 16 20'} {...rest} className={clsx(classes.root, className)}>
          <path d="M14 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V2C16 0.9 15.1 0 14 0ZM8 14H4C3.4 14 3 13.6 3 13C3 12.4 3.4 12 4 12H8C8.6 12 9 12.4 9 13C9 13.6 8.6 14 8 14ZM12 10H4C3.4 10 3 9.6 3 9C3 8.4 3.4 8 4 8H12C12.6 8 13 8.4 13 9C13 9.6 12.6 10 12 10ZM12 6H4C3.4 6 3 5.6 3 5C3 4.4 3.4 4 4 4H12C12.6 4 13 4.4 13 5C13 5.6 12.6 6 12 6Z" fill="#FFFFFF" />
        </SvgIcon>
      </a>
    </Link>
  )
}

export default memo(DOCIcon);
