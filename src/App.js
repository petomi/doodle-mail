import NavBar from './features/navigation/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { hideAlert } from './features/alerts/alertSlice'
import { Switch, Route } from 'react-router-dom'
import { Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/react'
import home from './pages/Home'
import join from './pages/Join'
import room from './pages/Room'
import { wakeDb } from './features/rooms/roomSlice'
import styles from './styles.js';
import { useEffect } from 'react'

function App() {
  const alerts = useSelector((state) => state.alerts.alerts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(wakeDb())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div style={styles.app}>
      <header>
        <NavBar />
        <AlertsBar alerts={alerts} />
      </header>
      <Switch>
        <Route exact path="/" component={home}/>
        <Route path="/join" component={join}/>
        <Route path="/room" component={room}/>
      </Switch>
    </div>
  )
}

const AlertsBar = ({ alerts }) => {
  const dispatch = useDispatch()
  let bar = null
  if (alerts.length > 0) {
    alerts.forEach((alert, index) => {
      bar = (
        <Alert status={alert.status}>
          <AlertIcon />
          <AlertDescription>{alert.description}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => dispatch(hideAlert(index))} />
        </Alert>
      )
    })
  }
  return bar
}

export default App;
