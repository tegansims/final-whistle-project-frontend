import React from 'react';
import { Segment, Button,  Header, Icon } from 'semantic-ui-react';
import VoteForm from './VoteForm'
import CommentForm from './CommentForm'
import AllGameVotes from './AllGameVotes'
import UpdateGameForm from './UpdateGameForm'
import Loading from '../components/Loading'

import API from '../adaptors/API'




class GamesShowPage extends React.Component {

    state = {
        gameToShow: '', 
        visible: false,
        comments: '',
        update: false,
        allVotes: false, 
        scorers: false,
        assists: false, 
        mom: false, 
        dod: false, 
        game: {
            completed: '',
            game_id: ''
        }
    }

    componentDidMount(){
        if (localStorage.getItem("token")) {
            API.game(this.props.match.params.id).then(game => this.setState({ 
                gameToShow: game, 
                game: {
                    completed: game.completed,
                    game_id: game.id
                }
            })  )
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

    handleHeaderClick = () => this.props.history.push('/games')
    gameDate = (date) => {
        let newDate = date.split('T')[0].split('-');
        return newDate[2]+"/"+newDate[1]+"/"+newDate[0]
    }
    
    gameTime = (date) => {
        let time = date.split('T')[1].split('.')[0].split(':')
        return "  " + time[0]+":"+time[1]
    }
    
    render(){
        const { currentUser, pushGameUpdateToState } = this.props
        const { gameToShow, comments, scorers, assists, mom, dod, teams} = this.state
        const { gameDate, gameTime, handleClick, handleCommentClick, handleUpdateGameClick, handleAllVotesClick, handleCompleteClick, handleVoteClick ,
             handleScorersClick, handleAssistsClick, handleMomClick, handleDodClick, handleHeaderClick} = this
        
        if (!this.props.currentUser || !this.state.gameToShow) {
            return (<Loading/>)
        } else {

        return (<div>
           <Segment.Group>
           <Segment size = 'huge' className='center aligned segment' onClick={handleHeaderClick}><Header>{gameToShow.opposition} </Header>
           <span   style={{ fontWeight: 'bold' }}>{gameToShow.team.name} {gameToShow.score} {gameToShow.opposition} </span> <br></br>
                {/* <Segment.Group horizontal width='equal'>
                    <Segment>{gameToShow.team.name}</Segment>
                    <Segment>{gameToShow.score}</Segment>
                    <Segment>{gameToShow.opposition}</Segment>
                </Segment.Group> */}
                { gameDate(gameToShow.date)} {gameTime(gameToShow.date)}  <br></br>
                {gameToShow.venue}<br></br>
                </Segment>
            </Segment.Group>
            <Segment.Group className='center aligned segment'>
                {gameToShow.completed && <Segment onClick={handleScorersClick} size = 'big' className='center aligned segment'> Scorers: <Icon disabled name='caret right' />
                    {scorers && <Segment>{gameToShow.scorers.map(scorer => <p key={scorer.id}>{scorer.player.name}</p>)}</Segment>  }
                    </Segment> }
                {gameToShow.completed && <Segment onClick={handleAssistsClick} size = 'big' className='center aligned segment'>Assists: <Icon disabled name='caret right' />
                    {assists && <Segment>{gameToShow.assists.map(assist => <p key={assist.id}>{assist.player.name}</p>)}</Segment> }
                    </Segment>}   
                {gameToShow.completed && <Segment onClick={handleMomClick} size = 'big' className='center aligned segment'>Man Of The Match:  <Icon disabled name='caret right' />
                    {mom && <Segment>{gameToShow.mom_winner} </Segment> }
                    </Segment> }
                {gameToShow.completed && <Segment onClick={handleDodClick} size = 'big' className='center aligned segment'>Dick Of The Day: <Icon disabled name='caret right' />
                    {dod && <Segment>{gameToShow.dod_winner}</Segment>}
                    </Segment> }

                {!gameToShow.completed && <Segment onClick={handleVoteClick} size = 'big'> Vote <Icon disabled name='caret right' /></Segment> }
                {!gameToShow.completed && this.state.vote && <VoteForm currentUser= {currentUser} game_id={gameToShow.id} pushGameUpdateToState={this.props.pushGameUpdateToState}/>}

                <Segment size = 'big' className='center aligned segment' onClick={handleCommentClick}>Comments: <Icon disabled name='caret right' /></Segment>
                    {comments &&   <CommentForm game={gameToShow} game_id={gameToShow.id} currentUser= {currentUser} 
                        pushGameUpdateToState={pushGameUpdateToState} handleCommentClick={handleCommentClick}/>  }

                    {/* if admin */}
                    {!gameToShow.completed && currentUser.admin && <Segment size = 'big' onClick={handleUpdateGameClick}> Update Game Details: <Icon disabled name='caret right' /></Segment> }
                    {!gameToShow.completed && currentUser.admin && this.state.update && <UpdateGameForm currentUser= {currentUser} game_id={gameToShow.id} pushGameUpdateToState={pushGameUpdateToState}/>}

                    {!gameToShow.completed && currentUser.admin && <Segment size = 'big'  onClick={handleAllVotesClick}> Show All Votes: <Icon disabled name='caret right' /> </Segment> }
                    {!gameToShow.completed && currentUser.admin && this.state.allVotes && <AllGameVotes currentUser= {currentUser} game={gameToShow} pushGameUpdateToState={pushGameUpdateToState} game_id={gameToShow.id}/>}
                    
                    {currentUser.admin && <Button size = 'big' onClick={handleCompleteClick} fluid>{gameToShow.completed? 'Edit Game' : 'Complete Game'}</Button>}
            </Segment.Group>
            </div>
       )}
    }

}

export default GamesShowPage;