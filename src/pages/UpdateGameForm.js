import React from 'react';
import { Form , Segment, Dropdown, Button} from 'semantic-ui-react';
import API from '../adaptors/API' 

class UpdateGameForm extends React.Component {

    state = {
        players: [],
        game: {
            homeScore: '', 
            awayScore: '', 
            game_id: this.props.game_id
        },
        scorers: []
    }

    componentDidMount() {
        API.players().then(allplayers => {
            this.setState({ players: allplayers.filter(player => player.team.id === this.props.currentUser.team_id) })
          })
    } 
    
    // --- handle submit --- //
    // const updateGame = (game, id) => patch(gamesUrl, id, game)

    handleSubmit = (event) => {
        console.log(this.state.game)
        console.log(this.props.game_id)
        event.preventDefault()

        API.updateGame({game:this.state.game}, this.props.game_id)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              alert('thanks for submitting the score')
              this.props.pushGameUpdateToState()            
            }
          })
          .catch(error => {
            alert(error)
          })
    }

    updateScoreOnClient = (data) => {console.log(data.score)}

    handleChange = event => this.setState({ 
        game: {
            ...this.state.game, 
            [event.target.name]: event.target.value  }
    })


    handleDropdownChange = (event, data) => {
        this.setState({
            scorers: {
                ...this.state.scorers, 
                scorers : data.value }})
    }

    // --- mapped players --- //
    mappedPlayers = () => {
        let output = this.state.players.map(player => {
            return {key: player.id, value:player.name, text: player.name }
        })
        return output
    }

    render(){
        const { homeScore, awayScore } = this.state
        const { handleChange, handleSubmit, handleDropdownChange } = this
        return <Segment>
        <Form unstackable onSubmit={handleSubmit}>
          <Form.Group  widths={2}>
            <Form.Field>
            <input type='number'
                id='homeScoreInput'
                label='homeScore'
                value={homeScore}
                onChange={handleChange}
                name='homeScore'
                placeholder='your score'
                />
            </Form.Field>
            <Form.Field>
            <input type='number'
                id='awayScoreInput'
                label='awayScore'
                value={awayScore}
                onChange={handleChange}
                name='awayScore'
                placeholder='their score'
                />
            </Form.Field>
          </Form.Group>
            {/* <label>Scorers: </label><br></br> */}
          {/* <Form.Group >
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
            <Form.Field>
            <input type='number'
                id='numberOfGoalsInput'
                label='numberOfGoals'
                value={awayScore}
                onChange={handleChange}
                name='numberOfGoals'
                placeholder='#'
                />
            </Form.Field>
          </Form.Group>   */}
        <Button>Submit Details</Button>
        </Form>
        </Segment>
    }

}

export default UpdateGameForm;