import NavBar from './components/navigation/Navbar'
import { Switch, Route } from 'react-router-dom'
import home from './pages/Home'
import login from './pages/Login'
import styles from './styles.js';

function App() {
  return (
    <div style={styles.app}>
      <header>
        <NavBar></NavBar>
      </header>
      <Switch>
        <Route exact path="/" component={home}/>
        <Route path="/login" component={login}/>
      </Switch>
    </div>
  );
}

export default App;
