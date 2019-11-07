import React from 'react';
import { Form, Button, Segment } from 'semantic-ui-react'
import API from '../adaptors/API'

class SignupForm extends React.Component {
    state = {
      users: [],
      email: '',
      password: '',
      password_confirmation: ''
    }

    componentDidMount () {
      API.users().then(allusers => {
        this.setState({ users: allusers }, () => console.log(this.state.users))
      })
        if (this.props.username) {
            this.props.history.push('/')
        }
    } 
  
    handleSubmit = (event) => {
      event.preventDefault()
      API.signUp({user: this.state})
        .then(data => {
          if (data.error) {
            throw Error(data.error)
          } else {
            console.log("data: ", data)
            this.props.signIn(data)
            this.props.history.push('/')  
          }
        })
        .catch(error => {
          alert(error)
        })
    }
  
    handleChange = event =>
      this.setState({ [event.target.name]: event.target.value })
  
    passwordValidation = (email) => email.includes('@') && email.includes('.')

    emailUniqueness = (email) => {
      let allEmails = this.state.users.map(user => user.email)
      return allEmails.includes(email)
    }

    handleLoginClick = () => this.props.history.push('/login')

    render () {
      const { email, password, password_confirmation } = this.state
      const { handleChange, handleSubmit, passwordValidation, emailUniqueness, handleLoginClick } = this
  
      return ( <Segment.Group>
        <Segment>
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
           <input 
            id='passwordInput'
            label='Password'
            value={password}
            onChange={handleChange}
            name='password'
            type='password'
            placeholder='password'
          />
          <br />
          <input 
            id='passwordConfirm'
            label='Password Confirmation'
            value={password_confirmation}
            onChange={handleChange}
            name='password_confirmation'
            type='password'
            placeholder='confirm your password'
          />
          <br />
          {passwordValidation(email) && !emailUniqueness(email) && password === password_confirmation ? <Button > Sign Up </Button> : <Button disabled> Sign Up </Button>}
        </Form>
        </Segment><Segment>
          <Button floated='right' onClick={handleLoginClick}>Back to log in page</Button>
        </Segment>
        </Segment.Group>
      )
    }
  }
  
  export default SignupForm;