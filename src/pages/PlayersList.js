import React from "react";
import PlayersTile from "./PlayersTile"
import { Segment } from "semantic-ui-react";

class PlayersList extends React.Component {
  playersSortedByName = () => {
    return this.props.players.sort(function(a, b) {
        a = a.name;
        b = b.name;
        return a>b ? 1 : a<b ? -1 : 0;
    });
  }

  render() {
    return (
        <Segment.Group>
        {this.playersSortedByName().map(player => (
          <PlayersTile key={player.id} player={player} history={this.props.history}></PlayersTile>
        ))}
        </Segment.Group>
    );
  }
}

export default PlayersList;
