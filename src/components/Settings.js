import React from 'react';
import {Button, Segment, Grid, Divider, Header} from 'semantic-ui-react'
import CreatePlayer from './Setup/CreatePlayer'
import CreateGame from './Setup/CreateGame'
import JoinTeam from './Setup/JoinTeam'
import Welcome from './Setup/Welcome'
import Loading from './Loading'



class Settings extends React.Component {

    state = {
        create: false,
        join: false, 
        options: true, 
        user: this.props.currentUser
    }
    
    componentDidMount () {
        if (!localStorage.getItem("token")) {
            this.props.history.push('/login')
        }
    }

    handleCreateClick = (item) => this.props.history.push(`/${item}/new`)
    
    handleJoinClick = () =>  this.setState({ 
        join: !this.state.join,
        create: false, 
        options: false   
    })

    componentDidUpdate(prevProps, prevState){
        if (this.state.user.admin !== prevState.user.admin) {
          
        }
      }
    
    
    render(){
        if (!this.props.currentUser) {
            return  <Loading/>
            
        } else {
            return <div>
            {this.state.options && <Welcome/> }

            <Segment.Group>
            {this.state.options && 

            <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
                <Divider vertical></Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column className='center aligned segment' >
                        <Header icon>
                            Create Team
                        </Header>
                        <Button primary onClick={()=>this.handleCreateClick('teams')}>Create Team</Button>
                        {this.props.currentUser.admin && <Button primary onClick={()=>this.handleCreateClick('players')}>Create Players</Button> }
                        {this.props.currentUser.admin &&<Button primary onClick={()=>this.handleCreateClick('games')}>Create Games</Button> }

                    </Grid.Column>
                        
                    <Grid.Column className='center aligned segment' >
                        <Header icon>
                            Join Team
                        </Header>
                        <Button primary onClick={this.handleJoinClick}>Join Team </Button>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            </Segment> }

            {this.state.create && <>
          
             <Segment><CreatePlayer/></Segment>
             <Segment><CreateGame pushGameUpdateToState={this.props.pushGameUpdateToState} /></Segment></> }
            
            {this.state.join && 'Join Team and link to a player account' && <JoinTeam teams={this.props.teams}
                currentUser={this.props.currentUser} pushUserUpdateToState={this.props.pushUserUpdateToState} history={this.props.history} /> }
           
           </Segment.Group>
            </div>
        }
    }

}

export default Settings;

