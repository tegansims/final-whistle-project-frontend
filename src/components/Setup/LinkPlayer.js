import React from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import API from '../../adaptors/API' 
import { Redirect } from 'react-router-dom';

const usertypeOptions = [
  { key: 'player', text: 'player', value: 'player' },
  { key: 'coach', text: 'coach', value: 'coach' },
  { key: 'supporter', text: 'supporter', value: 'supporter' },
]

class LinkPlayer extends React.Component {
    
    state ={
        user: {
            player: '',
            password: '', 
            user_id: this.props.currentUser.id,
            team_id: this.props.team_id, 
            usertype: ''
        },
        players: [], 
        // usertypes: [], 
        dropdown: false
    }

    componentDidMount() {
        API.players().then(allplayers => {
            this.setState({ players: allplayers.filter(player => player.team.id === this.props.team_id) })
          })
        // API.usertypes().then(usertypes => {
        //   this.setState({ usertypes })
        // })
    } 

    // ---- hanedling change and submits --- //
    handleChange = event => {
        console.log(event.target.value)
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

    handleRadioChange = (event, data) => {
      console.log(data.value)
          this.setState({ 
              user: {
                  ...this.state.user,
                  usertype : data.value }})
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

    // --- mapping players and usertypes --- //
    mappedPlayers = () => {
        let output = this.state.players.map(player => {
            return {key: player.id, value:player.name, text: player.name }
        })
        return output
    }

  //   mappedUsertypes = () => {
  //     let output = this.state.usertypes.map(usertype => {
  //         return {key: usertype.id, value:usertype.usertype, text: usertype.usertype }
  //     })
  //     return output
  // }
  

    render(){
        const { password } = this.state.user
        const { handleChange, handleSubmit, handleDropdownChange, handleRadioChange } = this

        return <div>
            <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Radio
            label='Player'
            value='player'
            checked={this.state.user.usertype === 'player'}
            onChange={handleRadioChange}
          />
          <Form.Radio
            label='Coach'
            value='coach'
            checked={this.state.user.usertype === 'coach'}
            onChange={handleRadioChange}
          />
          <Form.Radio
            label='Supporter'
            value='supporter'
            checked={this.state.user.usertype === 'supporter'}
            onChange={handleRadioChange}
          />
           {this.state.user.usertype === 'player' && <Dropdown
            labeled
            floating
            selection
            search
            options={this.mappedPlayers()}
            name='team'
            placeholder='link your player account'
            onChange={handleDropdownChange}>
         </Dropdown> }
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