
import { memo } from 'react'
import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 1.5),
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.background.primary
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
}));

const CardWrapper = ({
  title = '',
  children
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography
        variant='subtitle1'
        color='textPrimary'
        className={classes.title}
      >
        {title}
      </Typography>
      {children}
    </Card>
  )
}

export default memo(CardWrapper);