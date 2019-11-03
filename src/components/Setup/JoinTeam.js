import React from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';

class JoinTeam extends React.Component {

    state = {
        team: '',
        password: ''
      }


    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value })

   
    render(){
        const teams = this.props.teams.map(team => 
            <li key={team.id.toString()}>  {team.name}</li>)

        const { team, password } = this.state
        const { handleChange, handleSubmit } = this

    return <div>
        <Form>
        <Form.Group>
            <Form.Select
            floating
            options={teams}
            name='team'
            value={team}
            placeholder='choose your team'
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
        </Form>
        </div>
    }

}

export default JoinTeam;