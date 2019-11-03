import React from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';

class JoinTeam extends React.Component {

    state = {
        team: '',
        password: ''
      }


    handleChange = event => {
    console.log(event.target)
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        console.log(this.teams)
    }

   
    render(){
        const teams = this.props.teams.map(team => 
            <p key={team.id.toString()} id={team.id} value={team} text={team.name}>  {team.name}</p>)

        const { password } = this.state
        const { handleChange, handleSubmit } = this

    return <div>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Select
            // id='team'
            label='Team'
            floating
            // fluid
            options={teams}
            name='team'
            placeholder='choose your team'
            onChange={handleChange}

          />
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

        </Form>
        </div>
    }

}

export default JoinTeam;