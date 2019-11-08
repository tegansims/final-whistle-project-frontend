import React from 'react';
import {Form, Button} from 'semantic-ui-react'
import API from '../../adaptors/API' 

class CreateTeam extends React.Component {

    state = {
        name: '',
        password: '',
        password_confirmation: '',
        sport_id: ''
      }

    
    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        API.createTeam({team: this.state}).then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              this.props.history.push(`/teams/${data.id}`) // this will work once that route is set up!
            }
          })
          .catch(error => {
            alert(error)
          })
    }


    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })


    render () {
        const { name, password, password_confirmation } = this.state
        const { handleChange, handleSubmit } = this
    
        return (
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
        )
      }
}

export default CreateTeam;