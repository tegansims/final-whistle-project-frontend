import React from 'react';
import { Segment , Button} from 'semantic-ui-react';
import API from '../adaptors/API'



class AllGameVotes extends React.Component {

    state = {
        votes: [],
        momVotes: [],
        dodVotes: [], 
        momShow: false, 
        dodShow: false, 
        game: {
            category_id: '', 
            game_id: this.props.game_id,
        }
    }
    // const votes = game.votes.filter(vote => vote.category_id === 1 && vote.game_id === this.props.game.id)

    componentDidMount() {
        API.votes().then(allvotes => {
          this.setState({ 
              votes: allvotes.filter(vote => vote.game_id === this.props.game_id),
              momVotes: allvotes.filter(vote => vote.game_id === this.props.game_id && vote.category_id === 1), 
              dodVotes: allvotes.filter(vote => vote.game_id === this.props.game_id && vote.category_id === 2) 
            })
        })
      } 

    handleMomShowClick = () => this.setState({ 
        momShow: !this.state.momShow,
        dodShow: false
    })

    handleDodShowClick = () => this.setState({ 
        dodShow: !this.state.dodShow,
        momShow: false
    })    

    handleCalculateSubmit = (event, category_id) => {
        this.setState({ 
            game: {
                ...this.state.game, 
                category_id: category_id} }
            , () =>
        
        API.updateGame({game:this.state.game}, this.props.game_id)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              alert('results have been calculated!')
              this.props.pushGameUpdateToState()            
            }
          })
          .catch(error => {
            console.error(error)
          })
        )
    }

    getRandomInt = (max) =>  Math.floor(Math.random() * Math.floor(max))

    showRandomVote = (array) => {
        // momVotes[0].player.name
    // retrieve player name and comment from momVotes array
    // remove that element from array
    // repeat until none left
    }


    
    render(){
        return <Segment>
            
            <Button onClick={this.handleMomShowClick}>Man of the Match</Button> <Button onClick={this.handleDodShowClick}>Dick of the Day</Button>

            {this.state.momShow && <Segment>  Man of the match: <br></br>
                
                {this.props.game.mom_winner 
                ? this.props.game.mom_winner
                : this.state.momVotes.map(vote => <li key={vote.id}>{vote.player.name}: {vote.comment}</li>) 
            }
            {!this.props.game.mom_winner && <Button onClick={(event)=>this.handleCalculateSubmit(event, 1)}> Calculate and publish Winners</Button>}
            </Segment> }

            {this.state.dodShow &&<Segment> Dick of the day: <br></br>

                {this.props.game.dod_winner 
                ? this.props.game.dod_winner
                : this.state.dodVotes.map(vote => <li key={vote.id}>{vote.player.name}: {vote.comment}</li>)
                }
               
            {!this.props.game.dod_winner && <Button onClick={(event)=>this.handleCalculateSubmit(event, 2)}>Calculate and publish Winners</Button> }
            </Segment> }
                      
        </Segment>
       
    }

}

export default AllGameVotes;