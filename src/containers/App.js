import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import API from '../adaptors/API'
import NavBar from '../components/NavBar'
import Games from '../components/Games'
import Stats from '../components/Stats'
import Tactics from '../components/Tactics'
import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import Setup from '../components/Setup'
import SignupForm from '../components/SignupForm'
import Settings from '../components/Settings'
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {

  state = {
    email: ''
  }

  //  -- validating -- //
  componentDidMount () {
    if (localStorage.getItem('token') !== undefined) {
      API.validate().then(data => {
        if (data.error) {
          throw Error(data.error)
        } else {
          this.logIn(data)
          this.props.history.push('/')
        }
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

  // -- log in and out --- //
  logIn = user =>
    this.setState({ email: user.email } , () =>
    localStorage.setItem('token', user.token)
  );

  logOut = () => {
    this.setState({ email: "" }); 
    localStorage.removeItem('token')
  };

    // -- sign in and out --- //
    signIn = user =>
    this.setState({ email: user.email }, () =>
      localStorage.setItem("token", user.token)
    );

    signOut = () => {
      this.setState({ email: "" });
      localStorage.removeItem("token");
      this.props.history.push("/");
    };
  

  render () {
    return (
      <Router>
        {/*{code here}*/}
        <div>
        <NavBar username={this.state.email} logOut={this.logOut}/>
        {this.state.email ? this.state.email : null} 
        <Route exact path="/" component={routerProps => <Home {...routerProps} username={this.state.email}/>}  />
        <Route exact path="/games" component={routerProps => <Games {...routerProps} username={this.state.email}/>} />
        <Route exact path="/stats" component={routerProps => <Stats {...routerProps} username={this.state.email}/>} />
        <Route exact path="/settings" component={routerProps => <Settings {...routerProps} username={this.state.email}/>} />
        <Route exact path="/tactics" component={routerProps => <Tactics {...routerProps} username={this.state.email}/>} />
        <Route exact path="/login" component={routerProps => <LoginForm {...routerProps} logIn ={this.logIn}/> } />
        <Route exact path="/setup" component={routerProps => <Setup {...routerProps} username={this.state.email}/>}  />
        <Route exact path="/signup" component={routerProps => <SignupForm {...routerProps} signIn={this.signIn}/>}  />
        </div>
      </Router>
    );
  }
};

export default App