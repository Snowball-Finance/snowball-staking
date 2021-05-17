import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useContracts } from 'contexts/contract-context'
import SnowMultiSelect from 'components/UI/SnowMultiSelect'
import ContainedButton from 'components/UI/Buttons/ContainedButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  selectContainer: {
    width: 'calc(100% - 128px)'
  },
  buttonContainer: {
    width: 128,
    marginLeft: theme.spacing(1)
  },
  selectAll: {
    width: 120,
  },
}));

const FarmsSelect = ({
  selectedFarms,
  setSelectedFarms
}) => {
  const classes = useStyles();
  const { gauges } = useContracts();

  const selectAllHandler = () => {
    setSelectedFarms(gauges)
  }

  return (
    <div className={classes.root}>
      <div className={classes.selectContainer}>
        <SnowMultiSelect
          name='farms'
          placeholder='Select farms to boost'
          items={gauges}
          value={selectedFarms}
          onChange={e => setSelectedFarms(e.target.value)}
        />
      </div>
      <div className={classes.buttonContainer}>
        <ContainedButton
          className={classes.selectAll}
          onClick={selectAllHandler}
        >
          Select All
        </ContainedButton>
      </div>
    </div>
  )
}

export default memo(FarmsSelect)
