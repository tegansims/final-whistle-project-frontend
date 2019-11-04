import React, {Component} from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import API from '../adaptors/API'

class Vote extends React.Component {

    state = {
        mom: '',
        dod: '',
        momComment: '',
        dodComment: '', 
        game_id: this.props.game_id,
        user_id: this.props.currentUser.id, 
        players: []
    }

    componentDidMount() {
      API.players().then(allplayers => {
          this.setState({ players: allplayers.filter(player => player.team.id === this.props.currentUser.team_id) })
        })
  } 

    handleSubmit = (event) => {
        event.preventDefault()
        API.createVote(this.state)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
            //   this.props.history.push('/games')   // CHANGE THIS URL TO WHATEVER YOU WANT TO REDIRECT TO WHEN SIGNED IN
            }
          })
          .catch(error => {
            alert(error)
          })
      }
    
    handleChange = event =>
      this.setState({ [event.target.name]: event.target.value })

    handleDropdownMomChange = (event, data) => 
      this.setState({ mom : data.value } ) 

    handleDropdownDodChange = (event, data) => 
      this.setState({ dod : data.value } ) 

    mappedPlayers = () => {
      let output = this.state.players.map(player => {
          return {key: player.id, value:player.name, text: player.name }
      })
      return output
    }


    render(){
        const { mom, dod, momComment, dodComment } = this.state
        const { handleChange, handleSubmit, handleDropdownMomChange, handleDropdownDodChange } = this
        return <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Dropdown
                id='momInput'
                labeled
                fluid                
                selection
                onChange={handleDropdownMomChange}
                options={this.mappedPlayers()}
                name='mom'
                placeholder='Man of the Match'
            ></Dropdown>
            <input type='text'
                id='momComment'
                label='momComment'
                value={momComment}
                onChange={handleChange}
                name='momComment'
                placeholder='Reasons'
            />
            <Dropdown 
                id='dodInput'
                labeled
                fluid                
                selection
                onChange={handleDropdownDodChange}
                options={this.mappedPlayers()}
                name='dod'
                placeholder='Dick of the Day'
            ></Dropdown>
            <input 
                id='dodComment'
                label='dodComment'
                value={dodComment}
                onChange={handleChange}
                name='dodComment'
                type='text'
                placeholder='Reasons'
            />
          </Form.Group>
        <Button> Submit </Button>
        </Form>
    }

}

export default Vote;