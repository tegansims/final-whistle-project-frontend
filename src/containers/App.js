import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import NavBar from '../components/NavBar'
import Games from '../components/Games'
import Stats from '../components/Stats'
import Tactics from '../components/Tactics'
import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import Setup from '../components/Setup'
import Signup from '../components/Signup'
import Settings from '../components/Settings'
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {

  state = {
    email: ''
  }

  // -- log in and out --- //
  logIn = user =>
    this.setState({ email: user.email }
  );

  logOut = () => {
    this.setState({ email: "" });
  };


  render () {
    return (
      <Router>
        {/*{code here}*/}
        <div>
        <NavBar/>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/tactics" component={Tactics} />
        <Route exact path="/login" component={routerProps => <LoginForm {...routerProps} logIn ={this.logIn}/> } />
        <Route exact path="/setup" component={Setup} />
        <Route exact path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
};

export default App