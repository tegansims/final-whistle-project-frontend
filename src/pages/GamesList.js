import React from 'react';
import GamesTile from './GamesTile'

class GamesList extends React.Component {

    componentDidMount () {
        if (!localStorage.getItem("token")) {
            this.props.history.push('/login')
        }
    }
    
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.username !== prevProps.username) {
    //         this.props.history.push('/login')
    //     }
    // }

    gamesSortedByDate = () => {
        return this.props.games.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? 1 : a<b ? -1 : 0;
        });
    }

    gameIds = () => {
        this.gamesSortedByDate().map(game => game.id)
    }

    render(){
        return <div>
            {this.gamesSortedByDate().map(game => <GamesTile key={game.id} game={game} currentUser= {this.props.currentUser} pushGameUpdateToState={this.props.pushGameUpdateToState} history={this.props.history}/>)}
            </div>
    }

}

export default GamesList;