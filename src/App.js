import React, {createRef} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { Container, Sticky} from 'semantic-ui-react';

import API from './adaptors/API'
import NavBar from './components/NavBar'
import Setup from './components/Settings'
import 'semantic-ui-css/semantic.min.css'
import _ from 'lodash'

import pages from './pages/pages'
const { GamesList, Stats, Tactics, Home, LoginForm, SignupForm, GamesShowPage } = pages

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
          this.logIn(data)
          this.setState({currentUser: data.user})
          this.props.history.push('/')
        }
      })
      .catch(error => {
        console.log(error)
      })
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
  }

  // -- log in and out --- //
  logIn = user => {
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
  gamesSortedByDate = (games) => {
    return games.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? 1 : a<b ? -1 : 0;
    });
}
  nextMatch = () => this.gamesSortedByDate(this.filterGames()).find(game => !game.completed )

  // --- filtering just your team's players --- //
  filterPlayers = () => this.state.players.filter(player => player.team.id === this.state.currentUser.team_id)


  // --- changing team --- //
  setTeamId = (team) => {this.setState({ team_id: team.id})}

  // --- push update to state --- //
  pushGameUpdateToState = () => API.games().then(games => this.setState({ games }) )
  pushUserUpdateToState = (id) => API.currentUser(id).then(user=> console.log(user))
  

  // --- rendering --- //
  contextRef = createRef()

  render () {

    return (
      <Router>
        <div ref={this.contextRef}>
        <Sticky context={this.contextRef}>
          <NavBar attached ='top' currentUser={this.state.currentUser} logOut={this.logOut}/>
        </Sticky>

          <Container attached='bottom'>
            <Route exact path="/" component={routerProps => <Home {...routerProps} currentUser={this.state.currentUser} nextMatch={this.nextMatch()}/>}  />
            <Route exact path="/games" component={routerProps => <GamesList {...routerProps} currentUser={this.state.currentUser} 
                games={this.filterGames()} pushGameUpdateToState={this.pushGameUpdateToState} />} />

            <Route exact path="/games/:id" component={routerProps => <GamesShowPage {...routerProps} currentUser={this.state.currentUser} 
                 pushGameUpdateToState={this.pushGameUpdateToState} />} />

            <Route exact path="/stats/:id" component={routerProps => <Stats {...routerProps} currentUser={this.state.currentUser}/>} />
            <Route exact path="/tactics" component={routerProps => <Tactics {...routerProps} username={this.state.currentUser}/>} />
            <Route exact path="/login" component={routerProps => <LoginForm {...routerProps} logIn ={this.logIn} username={this.state.currentUser}/> } />
            <Route exact path="/settings" component={routerProps => <Setup {...routerProps} currentUser={this.state.currentUser} teams={this.state.teams} players={this.filterPlayers()}  
                setTeamId={this.setTeamId} pushUserUpdateToState={this.pushUserUpdateToState} pushGameUpdateToState={this.pushGameUpdateToState} history={this.props.history}/>}   />
            <Route exact path="/signup" component={routerProps => <SignupForm {...routerProps} username={this.state.currentUser} signIn={this.signIn} logIn ={this.logIn}/>}  />
         
          </Container>
          </div>
      </Router>
    );
  }
};

export default App