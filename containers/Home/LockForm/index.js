
import { memo, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useContracts } from 'contexts/contract-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import SnowTextField from 'components/UI/SnowTextField'
import SnowDatePicker from 'components/UI/SnowDatePicker'
import SnowRadio from 'components/UI/SnowRadio'
import CardWrapper from '../CardWrapper'
import { BALANCE_VALID, DATE_VALID, SELECT_VALID } from 'utils/constants/validations'
import DURATIONS from 'utils/constants/durations'
import {
  getDayOffset,
  getWeekDiff,
} from 'utils/helpers/date';
import {
  estimateXSnobForDate,
  roundDateByXSnobEpoch,
} from 'utils/helpers/stakeDate';

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

const dateAfter = getDayOffset(new Date(), 7);
const dateBefore = roundDateByXSnobEpoch(getDayOffset(new Date(), 365 * 4));

const LockForm = () => {
  const classes = useStyles();
  const { snowballBalance, createLock } = useContracts();

  const { control, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(schema)
  });

  const watchAllFields = watch()

  const onSubmit = async (data) => {
    try {
      createLock(data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    switch (watchAllFields.duration) {
      case '1':
        setValue('date', getDayOffset(new Date(), 7))
        break;
      case '2':
        setValue('date', getDayOffset(new Date(), 30))
        break;
      case '3':
        setValue('date', getDayOffset(new Date(), 364))
        break;
      case '4':
        setValue('date', getDayOffset(new Date(), 365 * 4))
        break;
      default:
        setValue('date', getDayOffset(new Date(), 7))
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchAllFields.duration]);

  const displayLockTime = useMemo(() => {
    const lockingWeeks = getWeekDiff(new Date(), (watchAllFields?.date || dateAfter));

    if (lockingWeeks < 52) {
      return `${lockingWeeks} week${lockingWeeks > 1 ? 's' : ''}`;
    } else {
      const years = Number(
        (+watchAllFields?.date - +new Date()) / 365 / 1000 / 3600 / 24,
      ).toFixed(0);
      return `${years} ${years === '1' ? 'year' : 'years'} (${lockingWeeks} weeks)`;
    }
  }, [watchAllFields?.date])

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
              label={`Balance: ${parseFloat(snowballBalance).toFixed(3)}`}
              placeholder='Balance'
              onMax={() => setValue('balance', snowballBalance)}
              error={errors.balance?.message}
              control={control}
              defaultValue={0.00}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              as={<SnowDatePicker />}
              name='date'
              label={`Lock for: ${displayLockTime}`}
              placeholder='Date'
              onMax={() => setValue('date', dateBefore)}
              error={errors.date?.message}
              control={control}
              defaultValue={dateAfter}
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
              {'You will receive '}
              <b>
                {watchAllFields.balance ? estimateXSnobForDate(+watchAllFields.balance, watchAllFields.date).toFixed(4) : 0}
              </b>
              {' xSnob'}
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