import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useContracts } from 'contexts/contract-context'
import SnowMultiSelect from 'components/UI/SnowMultiSelect'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import TOKENS from 'utils/temp/tokens'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  selectAll: {
    width: 200,
    marginLeft: theme.spacing(2)
  },
}));

const FarmsSelect = ({
  selectedFarms,
  setSelectedFarms
}) => {
  const classes = useStyles();
  const { } = useContracts();

  const selectAllHandler = () => {
    setSelectedFarms(TOKENS)
  }

  return (
    <div className={classes.root}>
      <SnowMultiSelect
        name='farms'
        placeholder='Select farms to boost'
        items={TOKENS}
        value={selectedFarms}
        onChange={e => setSelectedFarms(e.target.value)}
      />
      <ContainedButton
        className={classes.selectAll}
        onClick={selectAllHandler}
      >
        Select All
      </ContainedButton>
    </div>
  )
}

export default memo(FarmsSelect)
