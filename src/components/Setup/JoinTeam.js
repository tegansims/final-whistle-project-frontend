import React from 'react';
import { Form, Dropdown, Button, Segment } from 'semantic-ui-react';
import API from '../../adaptors/API' 
import LinkPlayer from './LinkPlayer'



class JoinTeam extends React.Component {

    state = {
        user: {
            team: '',
            password: '', 
            user_id: this.props.currentUser.id
        },
        user_id: this.props.currentUser.id, 
        team_id: '',
        joinTeam: true,
        linkPlayer: false
      }


    handleChange = event => {
        this.setState({ 
            user: {
                ...this.state.user,password : event.target.value }})
    }
    
    handleDropdownChange = (event, data) => {
        this.setState({
            user: {
                ...this.state.user, 
                team : data.value }})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        API.joinTeam({user:this.state.user}, this.state.user.user_id)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              this.props.pushUserUpdateToState(this.state.user.user_id)
              this.setState({
                  team_id: data.user.team_id,
                  joinTeam: false,
                  linkPlayer: true
                }, () => this.props.history.push('/linkplayer'))
            }
          })
          .catch(error => {
            alert(error)
          })
      }

    mappedTeams = () => {
        let output = this.props.teams.map(team => {
            return {key: team.id, value:team.name, text: team.name }
        })
        return output
    }


    render(){
        const { password } = this.state
        const { handleChange, handleSubmit, handleDropdownChange } = this

    return <div>
        {this.state.joinTeam && <Form onSubmit={handleSubmit}>
        <Segment>
        <Form.Group>
            <Dropdown
            // id='team'
              labeled
              floating
              selection
              search
              options={this.mappedTeams()}
              name='team'
              placeholder='choose your team'
              onChange={handleDropdownChange}>
            </Dropdown>
            
            <input 
              id='passwordInput'
              label='Password'
              value={password}
              name='password'
              type='password'
              onChange={handleChange}

              placeholder='team password'
            />
        </Form.Group>
        <Button> Join </Button>
        </Segment>
        </Form> 
        }

        { this.state.linkPlayer && <LinkPlayer  team_id = {this.state.team_id} currentUser={this.props.currentUser} pushUserUpdateToState={this.props.pushUserUpdateToState} history={this.props.history} /> }

        </div>
    }

}

export default JoinTeam;