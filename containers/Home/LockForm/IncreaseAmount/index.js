
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useContracts } from 'contexts/contract-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import SnowTextField from 'components/UI/SnowTextField'
import { BALANCE_VALID } from 'utils/constants/validations'

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

const IncreaseAmount = () => {
  const classes = useStyles();
  const { snowballBalance, increaseAmount } = useContracts();

  const schema = yup.object().shape({
    balance: BALANCE_VALID.max(snowballBalance, `This field should be less than ${snowballBalance}.`),
  });

  const { control, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await increaseAmount(data)
      await setValue('balance', 0)
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
            as={<SnowTextField />}
            type='number'
            name='balance'
            label={`Balance: ${parseFloat(snowballBalance).toFixed(3)}`}
            placeholder='Balance'
            onMax={() => setValue('balance', snowballBalance)}
            error={errors.balance?.message}
            control={control}
            defaultValue={0}
          />
        </Grid>
        <Grid item xs={12}>
          <ContainedButton
            fullWidth
            type='submit'
          >
            Increase Amount
          </ContainedButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default memo(IncreaseAmount)