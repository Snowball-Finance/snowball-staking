
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import SnowSelect from 'components/UI/SnowSelect'
import SnowTextField from 'components/UI/SnowTextField'
import {
  SELECT_VALID,
  BALANCE_VALID
} from 'utils/constants/validations'
import TOKENS from 'utils/temp/tokens'

const schema = yup.object().shape({
  token: SELECT_VALID,
  balance: BALANCE_VALID,
  total: BALANCE_VALID,
  xSnob: BALANCE_VALID
});

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

const CalculatorForm = () => {
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
    <form
      noValidate
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={<SnowSelect />}
            name='token'
            label='Token'
            placeholder='Select Token'
            items={TOKENS}
            error={errors.token?.message}
            control={control}
            defaultValue={TOKENS[0].VALUE}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<SnowTextField />}
            type='number'
            name='balance'
            label='Balance'
            placeholder='Balance'
            error={errors.balance?.message}
            control={control}
            defaultValue={0.00}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<SnowTextField />}
            type='number'
            name='total'
            label='Total'
            placeholder='Total'
            error={errors.total?.message}
            control={control}
            defaultValue={0.00}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={<SnowTextField />}
            type='number'
            name='xSnob'
            label='xSNOB'
            placeholder='xSNOB'
            error={errors.xSnob?.message}
            control={control}
            defaultValue={0.00}
          />
        </Grid>
        <Grid item xs={12}>
          <ContainedButton
            fullWidth
            type='submit'
          >
            Calculate
          </ContainedButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default memo(CalculatorForm)