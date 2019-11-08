import React, {createRef} from 'react';
import { Segment, Button, Sticky, Header , Message, Icon} from 'semantic-ui-react';
import VoteForm from './VoteForm'
import CommentForm from './CommentForm'
import AllGameVotes from './AllGameVotes'
import UpdateGameForm from './UpdateGameForm'
import Loading from '../components/Loading'

import API from '../adaptors/API'
import _ from 'lodash'



class GamesShowPage extends React.Component {

    state = {
        game: '', 
        visible: false,
        comments: '',
        update: false,
        allVotes: false, 
        scorers: false,
        assists: false, 
        mom: false, 
        dod: false
    }

    componentDidMount(){
        if (localStorage.getItem("token")) {
            API.game(this.props.match.params.id).then(game => this.setState({ game })  )
        } else {
            this.props.history.push("/login")
        }
    }

    handleClick = () =>  this.setState({ visible: !this.state.visible}) 
    handleVoteClick = () => this.setState({ vote: !this.state.vote}) 
    handleCommentClick = () => this.setState({ comments: !this.state.comments}) 
    handleUpdateGameClick = () => this.setState({ update: !this.state.update}) 
    handleAllVotesClick = () => this.setState({ allVotes: !this.state.allVotes}) 
    handleScorersClick = () => this.setState({scorers: !this.state.scorers})
    handleAssistsClick = () => this.setState({assists: !this.state.assists})
    handleMomClick = () => this.setState({mom: !this.state.mom})
    handleDodClick = () => this.setState({dod: !this.state.dod})

    handleCompleteClick = () => {
        this.setState({ 
            game: {
                ...this.state.game, 
                completed: !this.state.game.completed} }
            , () =>
        
        API.updateGame({game:this.state.game}, this.props.match.params.id)
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
            console.log(error)
          })
        )
    }

    gameDate = (date) => date.split('T')[0];
    
    gameTime = (date) => {
        // console.log(date)
        let time = date.split('T')[1].split('.')[0].split(':')
        return "  " + time[0]+":"+time[1]
    }
    
    render(){
        const { currentUser, pushGameUpdateToState } = this.props
        const { game, comments, scorers, assists, mom, dod} = this.state
        const { gameDate, gameTime, handleClick, handleCommentClick, handleUpdateGameClick, handleAllVotesClick, handleCompleteClick, handleVoteClick ,
             handleScorersClick, handleAssistsClick, handleMomClick, handleDodClick} = this
        
        if (!this.props.currentUser) {
            return (<Loading/>)
        } else {

        return (<div>
           <Segment.Group>
           <Segment size = 'huge' className='center aligned segment'><Header>{game.opposition} </Header>
                {game.score} <br></br>
                {game.date}<br></br>
                {/* { gameTime(game.date)}  */}
                {game.venue}<br></br>
                </Segment>
            </Segment.Group>
            <Segment.Group className='center aligned segment'>
                {game.completed && <Segment onClick={handleScorersClick} size = 'big' className='center aligned segment'> Scorers: 
                    {scorers && <Segment>{game.scorers.map(scorer => <p key={scorer.id}>{scorer.player.name}</p>)}</Segment>  }
                    </Segment> }
                {game.completed && <Segment onClick={handleAssistsClick} size = 'big' className='center aligned segment'>Assists: 
                    {assists && <Segment>{game.assists.map(assist => <p key={assist.id}>{assist.player.name}</p>)}</Segment> }
                    </Segment>}   
                {game.completed && <Segment onClick={handleMomClick} size = 'big' className='center aligned segment'>Man Of The Match:  
                    {mom && <Segment>{game.mom_winner} </Segment> }
                    </Segment> }
                {game.completed && <Segment onClick={handleDodClick} size = 'big' className='center aligned segment'>Dick Of The Day: 
                    {dod && <Segment>{game.dod_winner}</Segment>}
                    </Segment> }

                {!game.completed && <Segment onClick={handleVoteClick} size = 'big' > Vote </Segment> }
                {!game.completed && this.state.vote && <VoteForm currentUser= {currentUser} game_id={game.id} pushGameUpdateToState={this.props.pushGameUpdateToState}/>}

                <Segment size = 'big' className='center aligned segment' onClick={handleCommentClick}>Comments: </Segment>
                    {comments &&   <CommentForm game={game} game_id={game.id} currentUser= {currentUser} 
                        pushGameUpdateToState={pushGameUpdateToState} handleCommentClick={handleCommentClick}/>  }

                    {/* if admin */}
                    {!game.completed && currentUser.admin && <Segment size = 'big' onClick={handleUpdateGameClick}> Update Game Details: </Segment> }
                    {!game.completed && currentUser.admin && this.state.update && <UpdateGameForm currentUser= {currentUser} game_id={game.id} pushGameUpdateToState={pushGameUpdateToState}/>}

                    {!game.completed && currentUser.admin && <Segment size = 'big'  onClick={handleAllVotesClick}> Show All Votes: </Segment> }
                    {!game.completed && currentUser.admin && this.state.allVotes && <AllGameVotes currentUser= {currentUser} game={game} pushGameUpdateToState={pushGameUpdateToState} game_id={game.id}/>}
                    
                    {currentUser.admin && <Button size = 'big' onClick={handleCompleteClick} fluid>{game.completed? 'Edit Game' : 'Complete Game'}</Button>}
            </Segment.Group>
            </div>
       )}
    }

}

export default GamesShowPage;