import React from "react";
import { Segment, Icon } from "semantic-ui-react";

class PlayersTile extends React.Component {

    handleClick = () =>  this.props.history.push(`/players/${this.props.player.id}`)

  render() {
    const { player } = this.props
    return (
      <Segment
        key={player.id}
        className="center aligned segment"
        compact
        icon
        onClick={this.handleClick}
        history={this.props.history}
      >
        <h3>
          {player.name} <Icon disabled name='caret right' />
        </h3>
      </Segment>
    );
  }
}

export default PlayersTile;
