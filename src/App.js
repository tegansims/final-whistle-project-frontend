import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Container} from 'semantic-ui-react';

import API from './adaptors/API'
import NavBar from './components/NavBar'
import Setup from './components/Settings'
import 'semantic-ui-css/semantic.min.css'

import pages from './pages/pages'
const { GamesList, Stats, Tactics, Home, Settings, LoginForm, SignupForm } = pages

class App extends React.Component {

  state = {
    currentUser: null,
    team_id: 1, // NEED TO NOT HARDCODE THIS
    games: [],
    teams: [], 
    players: []
  }

  //  -- validating -- //
  componentDidMount () {
    if (localStorage.getItem('token') !== undefined) {
      API.validate().then(data => {
        if (data.error) {
          throw Error(data.error)
        } else {
          console.log(data)
          this.logIn(data)
          this.props.history.push('/')
          this.setState({user: data})
        }
      })
      .catch(error => {
        console.error(error)
      })
    }
    API.games().then(games => {
      this.setState({ games })
    })
    API.teams().then(teams => {
      this.setState({ teams })
    })
    API.players().then(players => {
      this.setState({ players })
    })
  }

  // -- log in and out --- //
  logIn = user => {
    console.log(user)
    this.setState({ currentUser: user.user } , () =>
    localStorage.setItem('token', user.token)
  );
  }

  logOut = () => {
    this.setState({ currentUser: null }); 
    localStorage.removeItem('token');
    // this.props.history.push("/");
  };

  // -- sign in and out --- //
  signIn = user =>
  this.setState({ currentUser: user.user }, () =>
    localStorage.setItem("token", user.token)
  );


  // --- filtering just your team's games --- //
  filterGames = () => this.state.games.filter(game => game.team.id === this.state.currentUser.team_id)

  // --- filtering just your team's players --- //
  filterPlayers = () => this.state.players.filter(player => player.team.id === this.state.currentUser.team_id)


  // --- changing team --- //
  setTeamId = (team) => {this.setState({ team_id: team.id})}

  // --- push comment to state --- //
  pushCommentToState = () => API.games().then(games => this.setState({ games }) )
  

  // --- rendering --- //
  render () {

    return (
      <Router>
        <NavBar currentUser={this.state.currentUser} logOut={this.logOut}/>

        <Container>
        <Route exact path="/" component={routerProps => <Home {...routerProps} currentUser={this.state.currentUser}/>}  />
        <Route exact path="/games" component={routerProps => <GamesList {...routerProps} currentUser={this.state.currentUser} 
            games={this.filterGames()} pushCommentToState={this.pushCommentToState} />} />
        <Route exact path="/stats" component={routerProps => <Stats {...routerProps} username={this.state.currentUser}/>} />
        <Route exact path="/tactics" component={routerProps => <Tactics {...routerProps} username={this.state.currentUser}/>} />
        <Route exact path="/login" component={routerProps => <LoginForm {...routerProps} logIn ={this.logIn} username={this.state.currentUser}/> } />
        <Route exact path="/settings" component={routerProps => <Setup {...routerProps} currentUser={this.state.currentUser} teams={this.state.teams} players={this.filterPlayers()}  setTeamId={this.setTeamId}/>}  />
        <Route exact path="/signup" component={routerProps => <SignupForm {...routerProps} username={this.state.currentUser} signIn={this.signIn} logIn ={this.logIn}/>}  />
        </Container>
      </Router>
    );
  }
};

export default App