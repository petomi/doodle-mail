import NavBar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'
import home from './pages/Home'
import login from './pages/Login'
import './App.css';

function App() {
  return (
    <div className="App">
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
