import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import { useContracts } from 'contexts/contract-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import CardWrapper from '../CardWrapper'
import FarmItem from './FarmItem'
import FarmsSelect from './FarmsSelect'

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  coin: {
    margin: theme.spacing(0, 1)
  }
}));

const SnowVote = () => {
  const classes = useStyles();
  const { } = useContracts();

  const [selectedFarms, setSelectedFarms] = useState([]);

  const voteHandler = () => {

  }
  return (
    <>
      <Typography
        variant='h1'
        className={classes.title}
      >
        Vote
      </Typography>
      <CardWrapper title='Select which farms to allocate SNOB rewards to using your xSNOB balance'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FarmsSelect
              selectedFarms={selectedFarms}
              setSelectedFarms={setSelectedFarms}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              Selected Farms
            </Typography>
            <FarmItem />
          </Grid>
          <Grid item xs={12}>
            <ContainedButton
              fullWidth
              onClick={voteHandler}
            >
              Submit Vote (weights must total 100%)
            </ContainedButton>
          </Grid>
        </Grid>
      </CardWrapper>
    </>
  )
}

export default memo(SnowVote)
