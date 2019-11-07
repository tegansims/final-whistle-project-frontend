import React, {createRef} from 'react';
import { Segment, Button, Sticky } from 'semantic-ui-react';
import VoteForm from './VoteForm'
import CommentForm from './CommentForm'
import AllGameVotes from './AllGameVotes'
import UpdateGameForm from './UpdateGameForm'
import API from '../adaptors/API'
import _ from 'lodash'


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
        }, 
        attached: 'bottom'
    }

    handleClick = () =>  this.setState({ visible: !this.state.visible, attached: 'top'}) 
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
            alert(error)
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

    contextRef = createRef()

    
    render(){
        const { game, currentUser } = this.props

        return <div ref={this.contextRef}>
            <Segment.Group >
            <Sticky context={this.contextRef}>
                <Segment attached={this.state.attached} onClick={this.handleClick} className='center aligned segment'>{game.opposition} <br></br>
                {game.score} 
                {this.state.visible && game.date} 
                {this.state.visible && <br></br>}
                {this.state.visible && game.venue}

                </Segment>
            </Sticky>

            {this.state.visible 
                ?  <Segment.Group>
                    
                    {game.completed && <Segment> Scorers:  {game.scorers.map(scorer => <li key={scorer.id}>{scorer.player.name}</li>)} </Segment> }
                    {game.completed && <Segment>Assists: {game.assists.map(assist => <li key={assist.id}>{assist.player.name}</li>)}</Segment> }   
                    {game.completed && <Segment>Man Of The Match:  {game.mom_winner} </Segment> }
                    {game.completed && <Segment>Dick Of The Day: {game.dod_winner}</Segment> }
                    
                    {!game.completed && <Segment onClick={this.handleVoteClick}> Vote </Segment> }
                    {!game.completed && this.state.vote && <VoteForm currentUser= {currentUser} game_id={game.id} pushGameUpdateToState={this.props.pushGameUpdateToState}/>}

                    <Segment onClick={this.handleCommentClick}>Comments: </Segment>
                    {this.state.comments &&   <CommentForm game={game} game_id={game.id} currentUser= {currentUser} 
                        pushGameUpdateToState={this.props.pushGameUpdateToState} handleClick={this.handleClick} handleCommentClick={this.handleCommentClick}/>  }

                    {/* if admin */}
                    {!game.completed && currentUser.admin && <Segment onClick={this.handleUpdateGameClick}> Update Game Details: </Segment> }
                    {!game.completed && currentUser.admin && this.state.update && <UpdateGameForm currentUser= {currentUser} game_id={game.id} pushGameUpdateToState={this.props.pushGameUpdateToState}/>}

                    {!game.completed && currentUser.admin && <Segment onClick={this.handleAllVotesClick}> Show All Votes: </Segment> }
                    {!game.completed && currentUser.admin && this.state.allVotes && <AllGameVotes currentUser= {currentUser} game={game} pushGameUpdateToState={this.props.pushGameUpdateToState} game_id={game.id}/>}
                    
                    {currentUser.admin && <Button onClick={this.handleCompleteClick} fluid>{game.completed? 'Edit Game' : 'Complete Game'}</Button>}


                   </Segment.Group>

                : null }
            </Segment.Group>
            </div>
    }

}

export default GamesTile;