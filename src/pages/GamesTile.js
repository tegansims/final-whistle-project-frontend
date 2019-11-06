import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import VoteForm from './VoteForm'
import CommentForm from './CommentForm'
import AllGameVotes from './AllGameVotes'
import UpdateGameForm from './UpdateGameForm'
import API from '../adaptors/API'


class GamesTile extends React.Component {

    state = {
        visible: false,
        comments: false,
        vote: false, 
        allVotes: false, 
        update: false, 
        game: {
            completed: this.props.game.completed,
            game_id: this.props.game.id

        }
    }

    handleClick = () =>  this.setState({ visible: !this.state.visible}) 
    handleCommentClick = () => this.setState({ comments: !this.state.comments}) 
    handleVoteClick = () => this.setState({ vote: !this.state.vote}) 
    handleAllVotesClick = () => this.setState({ allVotes: !this.state.allVotes}) 
    handleUpdateGameClick = () => this.setState({ update: !this.state.update}) 

    handleCompleteClick = () => {
        this.setState({ 
            game: {
                ...this.state.game, 
                completed: !this.state.game.completed} }
            , () =>
        
        API.updateGame({game:this.state.game}, this.props.game.id)
          .then(data => {
            if (data.error) {
              throw Error(data.error)
            } else {
              console.log("data: ", data)
              alert('successfully toggled state of game completedness')
              this.props.pushGameUpdateToState()            
            }
          })
          .catch(error => {
            console.error(error)
          })
        )
    }

    colour = (score) => {
        if (!score) {
            return ''
        }
        else {
            let homeScore = parseInt(score.split('-')[0] );
            let awayScore = parseInt(score.split('-')[1] );
            if (homeScore > awayScore) {
                return 'ui green segment'
            } else if (homeScore < awayScore) { 
                return  'ui red segment' 
            } else if (homeScore === awayScore) { 
                return 'ui blue segment'
            } 
        }
    }


    
    render(){
        
        return <div>
            <Segment.Group >
            {/* <Segment onClick={this.handleClick} textAlign='center'>{this.props.game.opposition} <br></br> */}
            <Segment onClick={this.handleClick} className='{this.colour(this.game.score)} center aligned segment'>{this.props.game.opposition} <br></br>
            {this.props.game.score} 
            {this.state.visible && this.props.game.date} <br></br>
            {this.state.visible && this.props.game.venue}

            </Segment>
            {this.state.visible 
                ?  <Segment.Group>
                    
                    {this.props.game.completed && <Segment> Scorers:  {this.props.game.scorers.map(scorer => <li key={scorer.id}>{scorer.player.name}</li>)} </Segment> }
                    {this.props.game.completed && <Segment>Assists: {this.props.game.assists.map(assist => <li key={assist.id}>{assist.player.name}</li>)}</Segment> }   
                    {this.props.game.completed && <Segment>Man Of The Match:  {this.props.game.mom_winner} </Segment> }
                    {this.props.game.completed && <Segment>Dick Of The Day: {this.props.game.dod_winner}</Segment> }
                    
                    {!this.props.game.completed && <Segment onClick={this.handleVoteClick}> Vote </Segment> }
                    {!this.props.game.completed && this.state.vote && <VoteForm currentUser= {this.props.currentUser} game_id={this.props.game.id}/>}

                    <Segment onClick={this.handleCommentClick}>Comments: </Segment>
                    {this.state.comments &&   <CommentForm game={this.props.game} game_id={this.props.game.id} currentUser= {this.props.currentUser} 
                        pushGameUpdateToState={this.props.pushGameUpdateToState} handleClick={this.handleClick} handleCommentClick={this.handleCommentClick}/>  }

                    {/* if admin */}
                    {!this.props.game.completed && this.props.currentUser.admin && <Segment onClick={this.handleUpdateGameClick}> Update Game Details: </Segment> }
                    {!this.props.game.completed && this.props.currentUser.admin && this.state.update && <UpdateGameForm currentUser= {this.props.currentUser} game_id={this.props.game.id} pushGameUpdateToState={this.props.pushGameUpdateToState}/>}

                    {!this.props.game.completed && this.props.currentUser.admin && <Segment onClick={this.handleAllVotesClick}> Show All Votes: </Segment> }
                    {!this.props.game.completed && this.props.currentUser.admin && this.state.allVotes && <AllGameVotes currentUser= {this.props.currentUser} game={this.props.game} pushGameUpdateToState={this.props.pushGameUpdateToState} game_id={this.props.game.id}/>}
                    
                    {this.props.currentUser.admin && <Button onClick={this.handleCompleteClick} fluid>{this.props.game.completed? 'Edit Game' : 'Complete Game'}</Button>}


                   </Segment.Group>

                : null }
            </Segment.Group>
            </div>
    }

}

export default GamesTile;