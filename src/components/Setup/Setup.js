import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import CreateTeam from './CreateTeam'
import CreatePlayer from './CreatePlayer'
import JoinTeam from './JoinTeam'

class Setup extends React.Component {

    // componentDidMount () {
    //     if (!this.props.username) {
    //         this.props.history.push('/login')
    //     }
    // }
    state = {
        create: false,
        join: false
    }

    handleCreateClick = () => this.setState({ create: !this.state.create })
    handleJoinClick = () =>  this.setState({ join: !this.state.join })

    
    
    render(){
        return <div>
            Setup
            <br></br>
            Welcome to Stattr Dattr <br></br>
            <Button onClick={this.handleCreateClick}>Create Team</Button><br></br><br></br>
            <Button onClick={this.handleJoinClick}>Join Team</Button>
            {this.state.create ? <div><CreateTeam /> <CreatePlayer/> </div>: null }
            {this.state.join ? <JoinTeam /> : null }
        </div>
    }

}

export default Setup;