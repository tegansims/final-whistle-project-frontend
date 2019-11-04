import React from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import API from '../../adaptors/API' 
import { Redirect } from 'react-router-dom';



class JoinTeam extends React.Component {

    state = {
        user: {
            team: '',
            password: '', 
            id: this.props.currentUser.id
        },
        user_id: this.props.currentUser.id
      }


    handleChange = event => {
    console.log(event.target)
        this.setState({ 
            user: {
                ...this.state.user,password : event.target.value }})
    }
    
    handleDropdownChange = (event, data) => {
        console.log(this.props.teams)
        // console.log(this.dropdownify(this.props.team, 0))
        this.setState({
            user: {
                ...this.state.user, 
                team : data.value }})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.user)
        console.log(this.state.user_id)
        API.joinTeam({user:this.state.user}, this.state.user.id)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              return <Redirect to= '/games'/> // REDIRECT TO GAMES
            }
          })
          .catch(error => {
            console.error(error)
          })
      }

    mappedTeams = () => {
        let output = this.props.teams.map(team => {
            return {key: team.id.toString, value:team.name, text: team.name }
        })
        return output
    }



    render(){
        const { password } = this.state
        const { handleChange, handleSubmit, handleDropdownChange } = this

    return <div>
        <Form onSubmit={handleSubmit}>
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

        </Form>
        </div>
    }

}

export default JoinTeam;