import React from 'react';
import LoginForm from './LoginForm'
import GamesShowPage from './GamesShowPage'
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';

class Home extends React.Component {

    // componentDidMount () {
    //     if (!this.props.username) {
    //         history.push('/login')
    //     }
    // }
    
    // RENDER LOGIC:
    // if no token
        // login/signup 
    // if token and !this.props.username and !user.team_id
        // setup
    // else (token and this.props.username and user.team_id)
        // home
    token = () => {
        localStorage.getItem('token')
    }

    nextMatch = () => {

    }

    render(){
        const {history, currentUser} = this.props
        return <div>
            Home
            {this.token && currentUser && !currentUser.team_id && history.push('/settings')}
            {/* {this.token && currentUser && currentUser.team_id && history.push('/games')} */}
            {!this.token && history.push('/login')}
             {/* <GamesTile history={this.props.history}  /> */}
            </div>
    }

}

export default Home;