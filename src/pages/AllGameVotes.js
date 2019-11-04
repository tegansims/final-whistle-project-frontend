import React from 'react';
import { Segment , Button} from 'semantic-ui-react';
import API from '../adaptors/API'



class AllGameVotes extends React.Component {

    state = {
        votes: [],
        momVotes: [],
        dodVotes: [], 
        momShow: false, 
        dodShow: false
    }
    // const votes = game.votes.filter(vote => vote.category_id === 1 && vote.game_id === this.props.game.id)

    componentDidMount() {
        API.votes().then(allvotes => {
          this.setState({ 
              votes: allvotes.filter(vote => vote.game_id === this.props.game_id),
              momVotes: allvotes.filter(vote => vote.game_id === this.props.game_id && vote.category_id === 1), 
              dodVotes: allvotes.filter(vote => vote.game_id === this.props.game_id && vote.category_id === 2) 
            }, () => console.log(this.votesRanked(this.mappedVotes(this.state.momVotes))))
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

    getRandomInt = (max) =>  Math.floor(Math.random() * Math.floor(max))

    showRandomVote = (array) => {
        // momVotes[0].player.name
    // retrieve player name and comment from momVotes array
    // remove that element from array
    // repeat until none left
    }

    mappedVotes = (array) => {
        let output = array.map(vote => vote.player.name)
        return output
    }

    votesRanked = (array) => {
        return array.reduce(function(prev,next){
            prev[next] = (prev[next] + 1) || 1;
            return prev;
        },{});
    }
    
    render(){
        return <div>
            <Button onClick={this.handleMomShowClick}>Man of the Match</Button> <Button onClick={this.handleDodShowClick}>Dick of the Day</Button>
            {this.state.momShow && <Segment> 
                Man of the match:  {this.state.momVotes.map(vote => <li key={vote.id}>{vote.player.name}: {vote.comment}</li>)} 
                <Button>Calculate Winners</Button><Button>Publish</Button>
            </Segment> }
            {this.state.dodShow &&<Segment> 
                Dick of the day:  {this.state.dodVotes.map(vote => <li key={vote.id}>{vote.player.name}: {vote.comment}</li>)} 
                <Button>Calculate Winners</Button> <Button>Publish</Button> 
            </Segment> }
                      
        </div>
       
    }

}

export default AllGameVotes;