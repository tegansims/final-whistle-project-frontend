import React from 'react';
import {Button, Segment, Grid, Divider, Header, Icon} from 'semantic-ui-react'
import CreateTeam from './CreateTeam'
import CreatePlayer from './CreatePlayer'
import CreateGame from './CreateGame'
import JoinTeam from './JoinTeam'
import Welcome from './Welcome'


class Setup extends React.Component {

    state = {
        create: false,
        join: false, 
        options: true
    }
    
    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }

    handleCreateClick = () => this.setState({ 
        create: !this.state.create,
        join: false,
        options: false
    })
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
            {this.state.create && <><Segment><CreateTeam /></Segment> <Segment><CreatePlayer/></Segment><Segment><CreateGame/></Segment></> }
            {/* {this.state.join && 'Join Team' && this.props.teams.map(team => <JoinTeam key={team.id} team = {team} /> )} */}
            {this.state.join && 'Join Team' && <JoinTeam teams={this.props.teams} setTeamId={this.props.setTeamId}/> }

        </div>
    }

}

export default Setup;