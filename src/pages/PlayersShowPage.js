import React from 'react';
import { Segment, Image, SegmentGroup } from "semantic-ui-react";
import index from "../images/players/index"
import API from '../adaptors/API'

const { claire, jen, tegan } = index
class PlayersShowPage extends React.Component {

    state = {
        player: {}
    }

    componentDidMount(){
        if (localStorage.getItem("token")) {
            API.player(this.props.match.params.id).then(player => this.setState({ player })  )
        } else {
            this.props.history.push("/login")
        }
    }

    render(){
        return (
            <SegmentGroup>
                <Segment>
                <Image src={claire} alt={this.state.player.name} size="medium" centered />
                {this.state.player.name}</Segment>
            </SegmentGroup>
        )
    }

}

export default PlayersShowPage;