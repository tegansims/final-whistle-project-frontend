import React from 'react';
import {Button, Segment, Grid, Divider, Header, Icon} from 'semantic-ui-react'
import CreateTeam from './Setup/CreateTeam'
import CreatePlayer from './Setup/CreatePlayer'
import CreateGame from './Setup/CreateGame'
import JoinTeam from './Setup/JoinTeam'
import Welcome from './Setup/Welcome'
import CreateSteps from './Setup/CreateSteps'

import { BrowserRouter as Router, Route  } from 'react-router-dom';

class Settings extends React.Component {

    state = {
        create: false,
        join: false, 
        options: true
    }
    
    componentDidMount () {
        if (!localStorage.getItem("token")) {
            this.props.history.push('/login')
        }
    }

    handleCreateClick = () => this.props.history.push('/teams/new')
    
    handleJoinClick = () =>  this.setState({ 
        join: !this.state.join,
        create: false, 
        options: false   
    })

    
    
    render(){
        return <div>
            {this.state.options && <Welcome/> }
            {this.state.options && 

            <Segment placeholder>
                <Grid columns={2} stackable textAlign='center'>
                <Divider vertical></Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                    <Header icon>
                        Create Team
                    </Header>
                    <Button primary onClick={this.handleCreateClick}>Create Team</Button>

                    </Grid.Column>
                        Or
                    <Grid.Column>
                    <Header icon>
                        Join Team
                    </Header>
                    <Button primary onClick={this.handleJoinClick}>Join Team</Button>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            </Segment> }
            {this.state.create && <>
          
             <Segment><CreatePlayer/></Segment>
             <Segment><CreateGame pushGameUpdateToState={this.props.pushGameUpdateToState} /></Segment></> }
            
            {this.state.join && 'Join Team and link to a player account' && <JoinTeam teams={this.props.teams} setTeamId={this.props.setTeamId} 
                currentUser={this.props.currentUser} pushUserUpdateToState={this.props.pushUserUpdateToState} history={this.props.history} /> }

        </div>
    }

}

export default Settings;

