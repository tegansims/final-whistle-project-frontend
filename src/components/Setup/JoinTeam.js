import React from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import API from '../../adaptors/API' 


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
        console.log(event)
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
            }
          })
          .catch(error => {
            console.error(error)
          })
      }

   
    render(){
        const teams = this.props.teams.map(team => 
            <p key={team.id.toString()} id={team.id} value={team} text={team.name}>  {team.name}</p>)

        const teams2 = [
            { key: 'eng', text: 'English', value: 'eng' }, 
            { key: 'spn', text: 'Spanish', value: 'spn' },
            { key: 'rus', text: 'Russian', value: 'Russian' },
            ]    
   
        const teams3 = [
            { key: this.props.teams[0].id, text: this.props.teams[0].name, value: this.props.teams[0].name}
            // { key: this.props.teams[1].id, text: this.props.teams[1].name, value: this.props.teams[1].name},
            // { key: this.props.teams[2].id, text: this.props.teams[2].name, value: this.props.teams[2].name},
            // { key: this.props.teams[3].id, text: this.props.teams[3].name, value: this.props.teams[3].name},
            // { key: this.props.teams[4].id, text: this.props.teams[4].name, value: this.props.teams[4].name}
        ]
      

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
            options={teams3}
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