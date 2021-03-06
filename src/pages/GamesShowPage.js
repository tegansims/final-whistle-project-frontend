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

    handleClick = (item) =>  this.setState({ [item]: !this.state[item]}) 

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
    
    allowed = () => this.props.gameIds.filter(id => id === this.props.match.params.id)

    render(){
        const { currentUser, pushGameUpdateToState } = this.props
        const { gameToShow, comments, scorers, assists, mom, dod} = this.state
        const { gameDate, gameTime, handleClick, handleCompleteClick , handleHeaderClick} = this
        
        if (!this.props.currentUser || !this.state.gameToShow  ) {
            return (<Loading/>)

        } else {

        return (<div>
   
           <Segment.Group>
           <Segment size = 'huge' className='center aligned segment' onClick={handleHeaderClick}><Header>{gameToShow.opposition} </Header>
           <span   style={{ fontWeight: 'bold' }}>{gameToShow.team.name} {gameToShow.score} {gameToShow.opposition} </span> <br></br>

                { gameDate(gameToShow.date)} {gameTime(gameToShow.date)}  <br></br>
                {gameToShow.venue}<br></br>
                </Segment>
            </Segment.Group>
            <Segment.Group className='center aligned segment'>
                {gameToShow.completed && <Segment onClick={()=>handleClick('scorers')} size = 'big'> Scorers: <Icon disabled name='caret right' />
                    {scorers && gameToShow.scorers.map(scorer => <h3 key={scorer.id}>{scorer.player.name}</h3>)}</Segment>  }
                {gameToShow.completed && <Segment onClick={()=>handleClick('assists')} size = 'big' >Assists: <Icon disabled name='caret right' />
                    {assists && gameToShow.assists.map(assist => <h3 key={assist.id}>{assist.player.name}</h3>)}</Segment> }       
                {gameToShow.completed && <Segment onClick={()=>handleClick('mom')} size = 'big' >Man Of The Match:  <Icon disabled name='caret right' />
                    {mom && <h3>{gameToShow.mom_winner} </h3> }</Segment> }
                 
                {gameToShow.completed && <Segment onClick={()=>handleClick('dod')} size = 'big' >Dick Of The Day: <Icon disabled name='caret right' />
                    {dod && <h3>{gameToShow.dod_winner}</h3> } </Segment>  }
                  

                {!gameToShow.completed && <Segment onClick={()=>handleClick('vote')} size = 'big'> Vote <Icon disabled name='caret right' /></Segment> }
                {!gameToShow.completed && this.state.vote && <VoteForm currentUser= {currentUser} game_id={gameToShow.id} pushGameUpdateToState={this.props.pushGameUpdateToState}/>}

                <Segment size = 'big'  onClick={()=>handleClick('comments')}>Comments: <Icon disabled name='caret right' /></Segment>
                    {comments &&   <CommentForm game={gameToShow} game_id={gameToShow.id} currentUser= {currentUser} 
                        pushGameUpdateToState={pushGameUpdateToState} />  }

                    {/* if admin */}
                    {!gameToShow.completed && currentUser.admin && <Segment size = 'big' onClick={()=>handleClick('update')}> Update Game Details: <Icon disabled name='caret right' /></Segment> }
                    {!gameToShow.completed && currentUser.admin && this.state.update && <UpdateGameForm game={gameToShow} currentUser= {currentUser} game_id={gameToShow.id} pushGameUpdateToState={pushGameUpdateToState}/>}

                    {!gameToShow.completed && currentUser.admin && <Segment size = 'big'  onClick={()=>handleClick('allVotes')}> Show All Votes: <Icon disabled name='caret right' /> </Segment> }
                    {!gameToShow.completed && currentUser.admin && this.state.allVotes && <AllGameVotes currentUser= {currentUser} game={gameToShow} pushGameUpdateToState={pushGameUpdateToState} game_id={gameToShow.id}/>}
                    
                    {currentUser.admin && <Button size = 'big' onClick={handleCompleteClick} fluid>{gameToShow.completed? 'Edit Game' : 'Complete Game'}</Button>}
            </Segment.Group>
            </div>
       )}
    }

}

export default GamesShowPage;