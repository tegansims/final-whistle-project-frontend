import React from 'react';
import { Form, Dropdown, Button, Segment } from 'semantic-ui-react';
import API from '../../adaptors/API' 
import Loading from '../Loading'

class LinkPlayer extends React.Component {
    
    state ={
        user: {
            player: '',
            password: '', 
            user_id: '',
            team_id: '', 
            usertype: ''
        },
        players: [],  
        dropdown: false
    }
 

    // ---- handling change and submits --- //
    handleChange = event => {
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
      this.setState({ 
          user: {
              ...this.state.user,
              usertype : data.value }}, () => {
                this.state.user.usertype === 'player' && API.players().then(allplayers => {
                  this.setState({ players: allplayers.filter(player => player.team.id === this.props.currentUser.team_id) })
                })
              })
      }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
          user: {
            ...this.state.user,
            user_id : this.props.currentUser.id,
            team_id: this.props.currentUser.team_id }}, () => {
    
        API.joinTeam({user:this.state.user}, this.state.user.user_id)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              this.props.pushUserUpdateToState(this.state.user.user_id)
              this.setState({
                  joinTeam: false,
                  linkPlayer: true
                })
                this.props.history.push('/games')
            }
          })
          .catch(error => {
            alert(error)
          })
        
    })
  }

    // --- mapping players and usertypes --- //
    mappedPlayers = () => {
        let output = this.state.players.map(player => {
            return {key: player.id, value:player.name, text: player.name }
        })
        return output
    }


    render(){
        const { password } = this.state.user
        const { handleChange, handleSubmit, handleDropdownChange, handleRadioChange } = this

         
      if (!this.props.currentUser) {
       return  <Loading/>
            
      } else { 
        return <Segment>
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
            {this.state.user.usertype === 'player' && 
              <Dropdown
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
    
        </Segment>
      }
    }

}

export default LinkPlayer;