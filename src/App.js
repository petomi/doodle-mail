import NavBar from './features/navigation/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { hideAlert } from './features/alerts/alertSlice'
import { Switch, Route } from 'react-router-dom'
import { Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/react'
import home from './pages/Home'
import join from './pages/Join'
import styles from './styles.js';

function App() {
  const alerts = useSelector((state) => state.alerts.alerts)
  return (
    <div style={styles.app}>
      <header>
        <NavBar />
        <AlertsBar alerts={alerts} />
      </header>
      <Switch>
        <Route exact path="/" component={home}/>
        <Route path="/join" component={join}/>
      </Switch>
    </div>
  );
}

const AlertsBar = ({ alerts }) => {
  const dispatch = useDispatch()
  if (alerts.length > 0) {
    alerts.forEach((alert, index) => {
      return (
        <Alert status={alert.status}>
          <AlertIcon />
          <AlertDescription>{alert.description}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => dispatch(hideAlert(index))} />
        </Alert>
      )
    })
  }
  else {
    return null
  }

}

export default App;
