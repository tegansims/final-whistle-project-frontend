import React from 'react';
import { Segment, Button, Container } from 'semantic-ui-react';

const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


class GamesTile extends React.Component {

    state = {
        visible: false,
        game: {
            completed: this.props.game.completed,
            game_id: this.props.game.id
        }
    }


    handleClick = () =>  this.props.history.push(`/games/${this.props.game.id}`)

  
    gameDate = (date) => {
        let newDate = date.split('T')[0].split('-');
        return newDate[2]+"/"+newDate[1]+"/"+newDate[0]
    }
    
    gameTime = (date) => {
        let time = date.split('T')[1].split('.')[0].split(':')
        return "  " + time[0]+":"+time[1]
    }


    
    render(){
        const { game, currentUser } = this.props
        const { gameDate, gameTime } = this

        return   <div>
            {/* <Segment.Group > */}
                <Segment attached={this.state.attached} onClick={this.handleClick} className='center aligned segment'><h3>{game.opposition} </h3>
                    {game.score}
                    {game.completed && <br></br>}
                    { gameDate(game.date)} {gameTime(game.date)} 
                    {/* <br></br>
                    { game.venue} */}
                </Segment>
            {/* </Segment.Group> */}
            </div>
    }

}

export default GamesTile;