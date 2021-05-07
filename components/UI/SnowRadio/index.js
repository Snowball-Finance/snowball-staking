
import React, { memo } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radio: {
    color: theme.palette.secondary.dark
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.secondary.main
  }
}));

const SnowRadio = React.forwardRef(({
  items,
  error,
  className,
  ...rest
}, ref) => {
  const classes = useStyles()

  return (
    <div className={className}>
      <RadioGroup
        ref={ref}
        aria-label='radio'
        className={classes.group}
        {...rest}
      >
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.VALUE}
            control={<Radio classes={{ root: classes.radio }} />}
            label={item.LABEL}
          />
        ))}
      </RadioGroup>
      {
        !!error &&
        <Typography variant='subtitle2' color='error'>
          {error}
        </Typography>
      }
    </div>
  );
})

export default memo(SnowRadio)