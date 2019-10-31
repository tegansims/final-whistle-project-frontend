import React, {Component} from 'react';
import { Form, Button } from 'semantic-ui-react'
import API from '../adaptors/API'

class SignupForm extends Component {
    state = {
      email: '',
      password: '',
      password_confirmation: ''
    }
  
    handleSubmit = (event) => {
      event.preventDefault()
      API.signUp({user: this.state})
        .then(data => {
          if (data.error) {
            throw Error(data.error)
          } else {
            console.log("data: ", data)
            //API.validate()
            this.props.signIn(data)
            this.props.history.push('/')   // CHANGE THIS URL TO WHATEVER YOU WANT TO REDIRECT TO WHEN SIGNED IN
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  
    handleChange = event =>
      this.setState({ [event.target.name]: event.target.value })
  
  
    render () {
      const { email, password, password_confirmation } = this.state
      const { handleChange, handleSubmit } = this
  
      return (
         <Form onSubmit={handleSubmit}>
       
         <input type='text'
            id='emailInput'
            label='Email'
            value={email}
            onChange={handleChange}
            name='email'
            placeholder='email'
          />
          <br />
           <input type='text'
            id='passwordInput'
            label='Password'
            value={password}
            onChange={handleChange}
            name='password'
            type='password'
            placeholder='password'
          />
          <br />
          <input type='text'
            id='passwordConfirm'
            label='Password Confirmation'
            value={password_confirmation}
            onChange={handleChange}
            name='password_confirmation'
            type='password'
            placeholder='confirm your password'
          />
          <br />
          <Button> Sign Up </Button>
        </Form>
      )
    }
  }
  
  export default SignupForm;