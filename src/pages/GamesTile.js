import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import Vote from './Vote'
import CommentForm from './CommentForm'

class GamesTile extends React.Component {

    state = {
        visible: false,
        comments: false,
        vote: false
    }

    handleClick = () =>  this.setState({ visible: !this.state.visible}) 
    handleCommentClick = () => this.setState({ comments: !this.state.comments}) 
    handleVoteClick = () => this.setState({ vote: !this.state.vote}) 

    colour = (score) => {
        // let score = this.game.score
        let homeScore = parseInt(score.split('-')[0] );
        let awayScore = parseInt(score.split('-')[1] );
        if (homeScore > awayScore) {
            return 'green'
        } else if (homeScore < awayScore) { 
            return  'red' 
        } else if (homeScore === awayScore) { 
            return 'blue'
        } else {
            return ''
        }
    }

    mom = (game) => {
        let votes = game.votes.filter(vote => vote.category_id === 1 && vote.game_id === this.props.game.id)
    }
    
    render(){
        return <div>
            <Segment.Group >
            <Segment color={()=>this.colour(this.game.score)} onClick={this.handleClick} textAlign='center'>{this.props.game.opposition} <br></br>
            {this.props.game.score} 
            {this.state.visible && this.props.game.date} <br></br>
            {this.state.visible && this.props.game.venue}

            </Segment>
            {this.state.visible 
                ?  <Segment.Group>
                    
                    {this.props.game.completed && <Segment> Scorers:  {this.props.game.scorers.map(scorer => <li key={scorer.id}>{scorer.player.name}</li>)} </Segment> }
                    {this.props.game.completed && <Segment>Assists: {this.props.game.assists.map(assist => <li key={assist.id}>{assist.player.name}</li>)}</Segment> }   
                    {this.props.game.completed && <Segment>Man Of The Match:   </Segment> }
                    {this.props.game.completed && <Segment>Dick Of The Day: </Segment> }
                    {!this.props.game.completed && <Segment onClick={this.handleVoteClick}> Vote </Segment> }
                    {!this.props.game.completed && this.state.vote && <Vote/>}
                    <Segment onClick={this.handleCommentClick}>Comments: </Segment>
                    {this.state.comments && <Segment> 
                        {this.props.game.notes.filter(note=>note.public === true).map(note => <li key={note.id}>{note.comment}</li>)} 
                           <CommentForm game_id={this.props.game.id}/>
                    </Segment> 
                    }
                   </Segment.Group>

                : null }
            </Segment.Group>
            </div>
    }

}

export default GamesTile;