import React from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import API from '../../adaptors/API' 
import { Redirect } from 'react-router-dom';

 

class LinkPlayer extends React.Component {
    
    state ={
        user: {
            player: '',
            password: '', 
            user_id: this.props.currentUser.id,
            team_id: this.props.team_id
        },
        players: []
    }

    componentDidMount() {
        API.players().then(allplayers => {
            console.log(allplayers)
            console.log(this.state.user.team_id)
            console.log(allplayers.filter(player => player.team.id === this.props.team_id))
            this.setState({ players: allplayers.filter(player => player.team.id === this.props.team_id) })
          })
    } 

    handleChange = event => {
        console.log(event.target)
            this.setState({ 
                user: {
                    ...this.state.user,
                    password : event.target.value }})
        }
        
    handleDropdownChange = (event, data) => {
        this.setState({
            user: {
                ...this.state.user, 
                player : data.value }})
    }

    handleSubmit = (event) => {
        console.log(this.state)
        event.preventDefault()

        API.joinTeam({user:this.state.user}, this.state.user.user_id)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              this.setState({
                  joinTeam: false,
                  linkPlayer: true
                })

              return <Redirect to= '/games'/> // REDIRECT TO GAMES
            }
          })
          .catch(error => {
            console.error(error)
          })
    }


    mappedPlayers = () => {
        let output = this.state.players.map(player => {
            return {key: player.id, value:player.name, text: player.name }
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
            labeled
            floating
            selection
            search
            options={this.mappedPlayers()}
            name='team'
            placeholder='link your player account'
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

export default LinkPlayer;