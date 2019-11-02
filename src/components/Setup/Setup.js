import React from 'react';
import {Button, Segment} from 'semantic-ui-react'
import CreateTeam from './CreateTeam'
import CreatePlayer from './CreatePlayer'
import CreateGame from './CreateGame'
import JoinTeam from './JoinTeam'


class Setup extends React.Component {

    state = {
        create: false,
        join: false
    }
    
    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }

    handleCreateClick = () => this.setState({ 
        create: !this.state.create,
        join: false
    })
    handleJoinClick = () =>  this.setState({ 
        join: !this.state.join,
        create: false    
    })

    
    
    render(){
        return <div>
            Setup
            <br></br>
            Welcome to Stattr Dattr <br></br>
            <Segment><Button onClick={this.handleCreateClick}>Create Team</Button></Segment>
            <Segment><Button onClick={this.handleJoinClick}>Join Team</Button></Segment>
            {this.state.create && <><Segment><CreateTeam /></Segment> <Segment><CreatePlayer/></Segment><Segment><CreateGame/></Segment></> }
            {this.state.join ? <JoinTeam /> : null }
        </div>
    }

}

export default Setup;