import React from 'react';
import LoginForm from './LoginForm'

class Home extends React.Component {

    // componentDidMount () {
    //     if (!this.props.username) {
    //         this.props.history.push('/login')
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

    currentUser = () => this.props.email



    render(){
        return <div>
            Home
            {!this.token ? this.props.history.push('/login') : null}
            {this.token && this.currentUser ? this.props.history.push('/setup') : null}
            </div>
    }

}

export default Home;