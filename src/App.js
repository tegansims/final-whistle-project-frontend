import React, {createRef} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
import { Container, Sticky} from 'semantic-ui-react';

import API from './adaptors/API'
import NavBar from './components/NavBar'
import Settings from './components/Settings'
import About from './components/About'
import 'semantic-ui-css/semantic.min.css'
import Loading from './components/Loading'

import pages from './pages/pages'
const { GamesList, Stats, Tactics2, Home, LoginForm, SignupForm, GamesShowPage, CreateTeam, CreatePlayer, CreateGame, LinkPlayer } = pages

class App extends React.Component {

  state = {
    loaded: null,
    currentUser: null,
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
    API.teams().then(teams => {
      this.setState({ teams })
    })
    API.games().then(games => {
      this.setState({ games })
    })
    API.players().then(players => {
      this.setState({ 
        players: players,
        loaded: true })
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

  gameIds = () => this.filterGames().map(game => game.id)


  // --- filtering just your team's players --- //
  filterPlayers = () => this.state.players.filter(player => player.team.id === this.state.currentUser.team_id)


  // --- push update to state --- //
  pushGameUpdateToState = () => API.games().then(games => this.setState({ games }) )
  pushUserUpdateToState = (id) =>  API.currentUser(id).then(user=> this.setState({ currentUser: user } ) )
      

  // --- rendering --- //
  contextRef = createRef()

  render () {if (!this.state.loaded) {
    return (
      <Loading/>
      )

    } else { 

    return (
      <Router>
        <div ref={this.contextRef}  >
        <Sticky context={this.contextRef}>
          <NavBar attached ='top' currentUser={this.state.currentUser} logOut={this.logOut}/>
        </Sticky>

          <Container attached='bottom'>
            <Switch>
            <Route exact path="/" component={routerProps => <Home {...routerProps} currentUser={this.state.currentUser} nextMatch={this.nextMatch()}/>}  />

            <Route exact path="/about" component={routerProps => <About {...routerProps} />}  />
            
            <Route exact path="/teams/new" component={routerProps => <CreateTeam {...routerProps} currentUser={this.state.currentUser} pushUserUpdateToState={this.pushUserUpdateToState}/>} />
            <Route exact path="/players/new" component={routerProps => <CreatePlayer {...routerProps} currentUser={this.state.currentUser}/>} />
            <Route exact path="/games/new" component={routerProps => <CreateGame {...routerProps} currentUser={this.state.currentUser} pushGameUpdateToState={this.pushGameUpdateToState}/>} />
            <Route exact path="/linkplayer" component={routerProps => <LinkPlayer {...routerProps} currentUser={this.state.currentUser} pushUserUpdateToState={this.pushUserUpdateToState}/>} />

            
            <Route exact path="/games" component={routerProps => <GamesList {...routerProps} currentUser={this.state.currentUser} 
                games={this.filterGames()} pushGameUpdateToState={this.pushGameUpdateToState} />} />
            <Route exact path="/games/:id" component={routerProps => <GamesShowPage {...routerProps} currentUser={this.state.currentUser} 
                 pushGameUpdateToState={this.pushGameUpdateToState} gameIds={this.gameIds()} />} />
            
            <Route exact path="/stats/:id" component={routerProps => <Stats {...routerProps} currentUser={this.state.currentUser}/>} />
            <Route exact path="/tactics" component={routerProps => <Tactics2 {...routerProps} currentUser={this.state.currentUser} pushUserUpdateToState={this.pushUserUpdateToState}/>} />
            <Route exact path="/login" component={routerProps => <LoginForm {...routerProps} logIn ={this.logIn} username={this.state.currentUser}/> } />
            <Route exact path="/settings" component={routerProps => <Settings {...routerProps} currentUser={this.state.currentUser} teams={this.state.teams} players={this.filterPlayers()}  
                 pushUserUpdateToState={this.pushUserUpdateToState} pushGameUpdateToState={this.pushGameUpdateToState} />}   />
            <Route exact path="/signup" component={routerProps => <SignupForm {...routerProps} username={this.state.currentUser} signIn={this.signIn} logIn ={this.logIn}/>}  />
            </Switch>
          </Container>
          </div>
      </Router>
    );
  }}
};

export default App