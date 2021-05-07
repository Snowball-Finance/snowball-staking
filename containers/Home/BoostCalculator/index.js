import { memo } from 'react'
import { Grid } from '@material-ui/core'

import CardWrapper from '../CardWrapper'
import CalculatorForm from './CalculatorForm'
import CalculatorPreview from './CalculatorPreview'

const BoostCalculator = () => {
  return (
    <CardWrapper title='Snowball Boost Calculator'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CalculatorForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CalculatorPreview />
        </Grid>
      </Grid>
    </CardWrapper>
  )
}

export default memo(BoostCalculator)
