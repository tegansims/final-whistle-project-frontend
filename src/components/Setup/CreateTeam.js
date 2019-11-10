import React from 'react';
import {Form, Button, Segment} from 'semantic-ui-react'
import API from '../../adaptors/API' 

class CreateTeam extends React.Component {

    state = {
        name: '',
        password: '',
        password_confirmation: '',
        sport_id: 1, 
        team_id: '', 
        user: {
          user_id: '',
          team_id: '', 
          password: ''
        }
      }

    
    handleSubmit = (event) => {
        event.preventDefault()
        API.createTeam({team: this.state}).then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              this.setState({
                user: {
                  team_id: data.id,
                  user_id:this.props.currentUser.id, 
                  password: this.state.password }
               }, () => {
                API.updateUser({user: this.state.user}, this.state.user.user_id).then(data => {
                  if (data.error) {
                    throw Error(data.error)
                  } else {
                    this.props.pushUserUpdateToState(this.state.user.user_id)
                    this.props.history.push('/settings')
                  }
                })
                .catch(error => {
                  alert(error)
                })
              })
            }
          })
          .catch(error => {
            alert(error)
          })
        
    }


    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

    handleCreatePlayers = () => this.props.history.push('/players/new')

    render () {
        const { name, password, password_confirmation } = this.state
        const { handleChange, handleSubmit, handleCreatePlayers } = this
    
        return (<Segment.Group>
          <Segment>
           <Form onSubmit={handleSubmit}>
         
           <input type='text'
              id='nameInput'
              label='Name'
              value={name}
              onChange={handleChange}
              name='name'
              placeholder='team name'
            />
            <br />
             <input 
              id='passwordInput'
              label='Password'
              value={password}
              onChange={handleChange}
              name='password'
              type='password'
              placeholder='team password'
            />
            <br />
            <input 
              id='passwordConfirm'
              label='Password Confirmation'
              value={password_confirmation}
              onChange={handleChange}
              name='password_confirmation'
              type='password'
              placeholder='confirm your team password'
            />
            <br />
            <Button> Create Team </Button>

            </Form>
      </Segment>
{/*       
      <Segment>
        <Button onClick={handleCreatePlayers} floated='right' >Create Players</Button>
      </Segment> */}
    
      </Segment.Group>
        )
      }
}

export default CreateTeam;