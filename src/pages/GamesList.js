import React from 'react';
import GamesTile from './GamesTile'

class GamesList extends React.Component {

    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }
    
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.username !== prevProps.username) {
    //         this.props.history.push('/login')
    //     }
    // }

    render(){
        return <div>
        {this.props.games.map(game => <GamesTile key={game.id} game={game} />)}
            </div>
    }

}

export default GamesList;