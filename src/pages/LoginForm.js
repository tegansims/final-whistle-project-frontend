import React from 'react';
import { Button, Form, Segment, Header, Image, Container } from 'semantic-ui-react'
import HeaderTop from './HeaderTop'
import API from '../adaptors/API'

const style = {
  background: '#3E4E56', 
  color: 'white',
  marginBottom: 0,
  minHeight: 220  
} 


class LoginForm extends React.Component {

  state = {
    email: '',
    password: ''
  }

  componentDidMount () {
    if (this.props.username) {
        this.props.history.push('/')
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    
    API.logIn(this.state)
      .then(data => {
        if (data.error) {
          throw Error(data.error)
        } else {
          this.props.logIn(data)
          this.props.history.push('/')   // CHANGE THIS URL TO WHATEVER YOU WANT TO  TO WHEN SIGNED IN
        }
      })
      .catch(error => {
        alert(error)
      })
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value })

  handleSignUpClick = () => this.props.history.push('/signup')


  render () {
    const { email, password } = this.state
    const { handleChange, handleSubmit, handleSignUpClick } = this

    return ( <Container text >
        <Segment.Group >

          <HeaderTop/>
          
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
            <Button> Log In </Button> 
          </Form>
          </Segment>
          
          <Segment>
            <Button floated='right' onClick = {handleSignUpClick}>No account? Sign up!</Button>
          </Segment>
          </Segment.Group>
      </Container>
    )
  }
}

export default LoginForm;  