import React from "react";
import { Segment } from "semantic-ui-react";

class GamesTile extends React.Component {
  state = {
    visible: false,
    game: {
      completed: this.props.game.completed,
      game_id: this.props.game.id
    }
  };

  handleClick = () => this.props.history.push(`/games/${this.props.game.id}`);

  gameDate = date => {
    let newDate = date.split("T")[0].split("-");
    return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
  };

  gameTime = date => {
    let time = date
      .split("T")[1]
      .split(".")[0]
      .split(":");
    return "  " + time[0] + ":" + time[1];
  };

  result = score => {
    let splitted = score.split("-");
    let result = parseInt(splitted[0]) - parseInt(splitted[1]);
    if (result < 0) return { color: "#B01943" };
    if (result > 0) return { color: "green" };
    else return { color: "grey" };
  };

  render() {
    const { game } = this.props;
    const { gameDate, gameTime, result } = this;

    return (
      <div>
        {game.completed ? (
          <Segment.Group>
            <Segment
              secondary
              onClick={this.handleClick}
              className="center aligned segment"
            >
              <h3 >{game.opposition}</h3>
              {gameDate(game.date)} {gameTime(game.date)}
              <br></br>
              <span style={result(game.score)}>{game.score}</span>  
            </Segment>
          </Segment.Group>
        ) : (
          <Segment.Group>
            <Segment
              onClick={this.handleClick}
              className="center aligned segment"
            >
              <h3>{game.opposition} </h3>
              {gameDate(game.date)} {gameTime(game.date)}
            </Segment>
          </Segment.Group>
        )}
      </div>
    );
  }
}

export default GamesTile;
