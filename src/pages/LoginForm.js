import React from 'react';
import { Button, Form, Segment, Container, Popup } from 'semantic-ui-react'
import HeaderTop from './HeaderTop'
import API from '../adaptors/API'



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
          <Popup position='bottom left' 
            content="Final Whistle is an app designed to help sports teams log their data. 
            Make use of our interactive tactics board to create and share tactics with the rest of your team. 
            Once you've joined a team, you'll also be able to track top scorers and top assists, post comments, and vote for man of the match."
            trigger={<Button icon='question' />} 
          />
      </Container>
    )
  }
}

export default LoginForm;  