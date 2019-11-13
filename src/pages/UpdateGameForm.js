import React from 'react';
import { Form , Segment, Dropdown, Button, Icon} from 'semantic-ui-react';
import API from '../adaptors/API' 

class UpdateGameForm extends React.Component {

    state = {
        players: [],
        game: {
            homeScore: '', 
            awayScore: '', 
            game_id: this.props.game_id
        },
        scorers: {
          player: '', 
          game_id: this.props.game_id,
          team_id: this.props.currentUser.team_id
        }, 
        assists: {
          player: '', 
          game_id: this.props.game_id,
          team_id: this.props.currentUser.team_id
        }
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
              this.props.pushGameUpdateToState()            
            }
          })
          .catch(error => {
            alert(error)
          })
    }

    handleScorerSubmit = (event) => {
      event.preventDefault()
      API.createScorer({scorer: this.state.scorers}).then(data =>{
       this.props.pushGameUpdateToState()
      })
    }

    handleAssistSubmit = (event) => {
      event.preventDefault()
      API.createAssist({assist: this.state.assists}).then(data =>{
       this.props.pushGameUpdateToState() 
      })
    }


    handleGameChange = event => this.setState({ 
        game: {
            ...this.state.game, 
            [event.target.name]: event.target.value  }
    })

    handleDropdownChange = (event, data) => {
        this.setState({
            scorers: {
                ...this.state.scorers, 
                player : data.value }})
    }

    handleDropdownAssistsChange = (event, data) => {
      this.setState({
          assists: {
              ...this.state.assists, 
              player : data.value }})
  }

    deleteScorer =(scorerObj) => {
      console.log(scorerObj)
      this.setState({
        scorers: {
            ...this.state.scorers, 
            player : scorerObj.player.name, 
            scorer_id: scorerObj.id }
          }, () =>
              API.deleteScorer({scorer: this.state.scorers}, this.state.scorers.scorer_id)
              .then(data => { 
                this.props.pushGameUpdateToState() 
        })
      )}

    deleteAssist =(assistObj) => {
      console.log(assistObj)
      this.setState({
        assists: {
            ...this.state.assists, 
            player : assistObj.player.name, 
            assist_id: assistObj.id }
          }, () =>
              API.deleteAssist({assist: this.state.assists}, this.state.assists.assist_id)
              .then(data => { 
                this.props.pushGameUpdateToState() 
        })
      )}



    // --- mapped players --- //
    mappedPlayers = () => {
        let output = this.state.players.map(player => {
            return {key: player.id, value:player.name, text: player.name }
        })
        return output
    }

    render(){
        const { homeScore, awayScore} = this.state.game
       
        const { handleGameChange, handleSubmit, handleDropdownChange ,handleDropdownAssistsChange,  handleScorerSubmit, handleAssistSubmit, deleteScorer, deleteAssist} = this
        return <Segment className='center aligned segment'>
        <Form unstackable onSubmit={handleSubmit}>
          <Form.Group  widths={2}>
            <Form.Field>
            <input type='number'
                id='homeScoreInput'
                label='homeScore'
                value={homeScore}
                onChange={handleGameChange}
                name='homeScore'
                placeholder='your score'
                />
            </Form.Field>
            <Form.Field>
            <input type='number'
                id='awayScoreInput'
                label='awayScore'
                value={awayScore}
                onChange={handleGameChange}
                name='awayScore'
                placeholder='their score'
                />
            </Form.Field>
            </Form.Group>
          {homeScore && awayScore ? <Button >Submit Details</Button> : <Button disabled>Submit Details</Button> }
        </Form>

            <label>Scorers: </label><br></br>
      {this.props.game.scorers.map(scorer => <p onClick={() => deleteScorer(scorer)} key={scorer.id}>{scorer.player.name} <Icon name='delete'/></p>)}
          <Form onSubmit={handleScorerSubmit}>
            <Dropdown
                labeled
                floating
                selection
                search
                options={this.mappedPlayers()}
                name='player'
                value={this.state.scorers.player}
                placeholder='scorer'
                onChange={handleDropdownChange}>
            </Dropdown>
          {this.state.scorers.player ? <Button >Submit Scorers</Button> : <Button disabled >Submit Scorers</Button> }
          </Form>  
          <label>Assists: </label><br></br>
          {this.props.game.assists.map(assist => <p onClick={() => deleteAssist(assist)} key={assist.id}>{assist.player.name} <Icon name='delete'/></p>)}

          <Form onSubmit={handleAssistSubmit}>
            <Dropdown
                labeled
                floating
                selection
                search
                options={this.mappedPlayers()}
                name='player'
                value={this.state.assists.player}
                placeholder='assist'
                onChange={handleDropdownAssistsChange}>
            </Dropdown>
            {this.state.assists.player ? <Button >Submit Assists</Button> : <Button disabled >Submit Assists</Button> }
          </Form> 
        
        </Segment>
    }

}

export default UpdateGameForm;