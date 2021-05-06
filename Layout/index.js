
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TopAppBar from './TopAppBar'
import Footer from './Footer'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1 0 auto',
    margin: theme.spacing(5, 0)
  },
}));

const Layout = ({
  children
}) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <main className={classes.root}>
      <TopAppBar />
      <div className={classes.container}>
        <div className={commonClasses.containerWidth}>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default memo(Layout);
