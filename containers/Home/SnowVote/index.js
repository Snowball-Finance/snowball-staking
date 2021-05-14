import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import { useContracts } from 'contexts/contract-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import CardWrapper from '../CardWrapper'
import FarmItem from './FarmItem'
import FarmsSelect from './FarmsSelect'
import { isEmpty } from 'utils/helpers/utility'

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
  const { isWrongNetwork, gauges } = useContracts();

  const [selectedFarms, setSelectedFarms] = useState([]);
  // const [newWeights, setNewWeights] = useState({});

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
      {isWrongNetwork
        ? (
          <Typography variant='body1' color='textSecondary'>
            Please switch to Avalanche Chain
          </Typography>
        ) : isEmpty(gauges)
          ? (
            <Typography variant='body1' color='textSecondary'>
              Loading Farms
            </Typography>
          ) : (
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
                </Grid>
                {isEmpty(selectedFarms)
                  ? (
                    <Grid item xs={12}>
                      <Typography variant='body1' color='textSecondary'>
                        Please select farms from dropdown
                      </Typography>
                    </Grid>
                  )
                  : selectedFarms.map((farmItem, index) => (
                    <Grid item xs={12} key={index}>
                      <FarmItem item={farmItem} />
                    </Grid>
                  ))
                }
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
          )
      }
    </>
  )
}

export default memo(SnowVote)
