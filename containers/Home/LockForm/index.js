
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import SnowTextField from 'components/UI/SnowTextField'
import SnowDatePicker from 'components/UI/SnowDatePicker'
import SnowRadio from 'components/UI/SnowRadio'
import CardWrapper from '../CardWrapper'
import { BALANCE_VALID, DATE_VALID, SELECT_VALID } from 'utils/constants/validations'
import DURATIONS from 'utils/constants/durations'

const schema = yup.object().shape({
  balance: BALANCE_VALID,
  date: DATE_VALID,
  duration: SELECT_VALID
});

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

const LockForm = () => {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <CardWrapper title='Lock Snowballs for xSNOB'>
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              as={<SnowTextField />}
              type='number'
              name='balance'
              label='Balance: 0'
              placeholder='Balance'
              onMax={() => { }}
              error={errors.balance?.message}
              control={control}
              defaultValue={0.00}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              as={<SnowDatePicker />}
              name='date'
              label='Lock for: 4 weeks'
              placeholder='Date'
              error={errors.date?.message}
              control={control}
              defaultValue={new Date()}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='body1'
              color='textSecondary'
            >
              Note: your selected date will be rounded to the nearest weekly xSNOB epoch
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<SnowRadio />}
              name='duration'
              items={DURATIONS}
              control={control}
              defaultValue={DURATIONS[0].VALUE}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='body2'
              color='textSecondary'
            >
              You will receive <b>1207.5391</b> xSNOB
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ContainedButton
              fullWidth
              type='submit'
            >
              Approve and Create Lock
            </ContainedButton>
          </Grid>
        </Grid>
      </form>
    </CardWrapper>
  )
}

export default memo(LockForm)