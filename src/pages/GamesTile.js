import React from 'react';
import { Segment } from 'semantic-ui-react';

class GamesTile extends React.Component {

    state = {
        visible: false
    }

    handleClick = () => {
        this.setState({ visible: !this.state.visible})
    }
    render(){
        return <div>
            <Segment.Group>
            <Segment onClick={this.handleClick} textAlign='center'>{this.props.game.opposition} <br></br>
            {this.props.game.score} <br></br>

            {this.state.visible 
                ?  <Segment.Group>
                    {this.props.game.date}<br></br>
                    {this.props.game.venue}

                    <Segment>Scorers:  </Segment>
                    <Segment>Assists: </Segment>
                    <Segment>Man Of The Match: </Segment>
                    <Segment>Dick Of The Day: </Segment>
                    <Segment>Comments: </Segment>
                   </Segment.Group>

                : null }
            </Segment>
            </Segment.Group>
            </div>
    }

}

export default GamesTile;