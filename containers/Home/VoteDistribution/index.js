import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { Pie } from 'react-chartjs-2';
import { useContracts } from 'contexts/contract-context'
import CardWrapper from '../CardWrapper'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
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
}));

const VoteDistribution = () => {
  const classes = useStyles();
  const { gauges } = useContracts();
  const [showGraph, setShowGraph] = useState(false);

  function toggleGraph() {
    setShowGraph(!showGraph);
  }

  var gData = [];
  var gLabel = [];
  if(gauges.length > 0) {
    for(let i = 0;i < gauges.length;i++) {
      gData[i] = gauges[i].allocPoint * 100;
      gLabel[i] = gauges[i].depositTokenName;
    }
  }
  

  const data = {
    labels: gLabel,
    datasets: [
      {
        label: '# of Votes',
        data: gData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <Typography
        variant='h1'
        className={classes.title}
      >
        SNOB Reward Allocations
      </Typography>

      {isEmpty(gauges)
        ? (
          <Typography variant='body1' color='textSecondary'>
            Loading graph data..
          </Typography>
        ) : (
          <CardWrapper title='This chart shows the current SNOB  reward allocations per pool (updated weekly).'>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{display: showGraph?"block":"none"}}>
                <Pie data={data} />
              </Grid>
              <Grid item xs={12}>
                <ContainedButton
                  fullWidth
                  onClick={toggleGraph}
                >{showGraph?"Hide Graph":"Show Graph"}</ContainedButton>
              </Grid>
            </Grid>
          </CardWrapper>
        )
      }
    </>
  )
}

export default memo(VoteDistribution)
