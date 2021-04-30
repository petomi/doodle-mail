import NavBar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'
import home from './pages/Home'
import './App.css';

function App() {
  const login = () => { return <h1>Login Page</h1>}
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
