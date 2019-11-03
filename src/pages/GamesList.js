import React from 'react';
import GamesTile from './GamesTile'

class GamesList extends React.Component {

    componentDidMount () {
        if (!this.props.currentUser) {
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
        {this.props.games.map(game => <GamesTile key={game.id} game={game} currentUser= {this.props.currentUser}/>)}
            </div>
    }

}

export default GamesList;