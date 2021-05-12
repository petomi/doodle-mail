import { useEffect, useState } from 'react'
import NavBar from './features/navigation/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { hideAlert } from './features/alerts/alertSlice'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/react'
import home from './pages/Home'
import join from './pages/Join'
import room from './pages/Room'
import draw from './pages/Draw'

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#1565C0')
  const alerts = useSelector((state) => state.alerts.alerts)
  // const dispatch = useDispatch()
  let location = useLocation()
  // every time route updates, update background color to fit route
  useEffect(() => {
    setBackgroundColor(getRouteBackgroundColor(location.pathname))
  }, [location])
  return (
    <div style={{ textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: backgroundColor }}>
      <header>
        <NavBar />
        <AlertsBar alerts={alerts} />
      </header>
      <Switch>
        <Route exact path="/" component={home}/>
        <Route path="/join" component={join}/>
        <Route path="/room" component={room}/>
        <Route path="/draw" component={draw}/>
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

// return a different background color for each route
const getRouteBackgroundColor = (route) => {
  switch(route) {
    case '/join':
      return '#6200EE'
    case '/room':
      return '#E2E8F0'
    case '/draw':
      return '#4A5568'
    case '/':
    default:
      return '#1565C0'
  }
}

export default App
