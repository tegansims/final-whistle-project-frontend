import React from 'react';
import { Form, Button, Dropdown, Segment } from 'semantic-ui-react';
import API from '../adaptors/API'

class VoteForm extends React.Component {

  state = {
    vote: {
      mom: '',
      dod: '',
      game_id: this.props.game_id,
      user_id: this.props.currentUser.id,
      momComment: '',
      dodComment: ''
    },
      players: [], 
      votes: [], 
      alreadyVoted: []
  }

  componentDidMount() {
    
    API.players().then(allplayers => {
        this.setState({ players: allplayers.filter(player => player.team.id === this.props.currentUser.team_id) })
      })
    API.votes().then(allvotes => {
        this.setState({  votes: allvotes.filter(vote => vote.game_id === this.state.vote.game_id)   
      }, () => this.setState({
        alreadyVoted: this.votedAlready()
      }) )
  
  } )
}

  handleSubmit = (event) => {
      event.preventDefault()
      API.createVote({vote: this.state.vote})
        .then(data => {
          if (data.error) {
            throw Error(data.error)
          } else {
            console.log("data: ", data)
            alert('thanks for voting!')
            this.props.pushGameUpdateToState() 
          }
        })
        .catch(error => {
          alert(error)
        })
    } 
    
    handleChange = event =>
      this.setState({  vote: {
          ...this.state.vote,
          [event.target.name]: event.target.value }
      })

    handleDropdownMomChange = (event, data) => 
      this.setState({  vote: {
          ...this.state.vote,
          mom : data.value } 
        }) 

    handleDropdownDodChange = (event, data) => 
      this.setState({ vote: {
          ...this.state.vote,
          dod : data.value } 
        }) 

    mappedPlayers = () => {
      let output = this.state.players.map(player => {
          return {key: player.id, value:player.name, text: player.name }
      })
      return output
    }

    votedAlready = () => {
      return this.state.votes.filter(vote => vote.user_id === this.state.vote.user_id && vote.game_id === this.state.vote.game_id)
    }

    render(){
        const { momComment, dodComment, mom, dod } = this.state.vote
        const { handleChange, handleSubmit, handleDropdownMomChange, handleDropdownDodChange, mappedPlayers, votedAlready } = this
        return <Segment>
        {this.state.alreadyVoted.length 
        ? <h3 className='center aligned segment'>You've already voted! </h3>
        :
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Dropdown
                id='momInput'
                labeled
                fluid                
                selection
                search
                onChange={handleDropdownMomChange}
                options={mappedPlayers()}
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
                search
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
          {mom && dod && momComment && dodComment ? <Button > Submit </Button> : <Button disabled> Submit </Button>}
        </Form>
        }
        </Segment>
    }

}

export default VoteForm;