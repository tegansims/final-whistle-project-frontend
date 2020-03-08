import React from 'react';
import { Segment, Image, SegmentGroup } from "semantic-ui-react";
import index from "../images/players/index"
import API from '../adaptors/API'

const { tegan, muir, daria, brady, elder, myra, nat, claire, 
    izzy, genie, fran, jen, becs, hazza, maddie, younger, jess, gracie 
} 
    = index

const imageMapper = [
    {id: 1, name: tegan},
    {id: 2, name: muir},
    {id: 3, name: daria},
    {id: 4, name: brady},
    {id: 5, name: elder},
    {id: 6, name: myra},
    {id: 7, name: nat},
    {id: 8, name: claire},
    {id: 9, name: izzy},
    {id: 10, name: genie},
    {id: 11, name: fran},
    {id: 12, name: jen},
    {id: 13, name: becs},
    {id: 14, name: hazza},
    {id: 15, name: maddie},
    {id: 16, name: younger},
    {id: 24, name: jess},
    {id: 58, name: gracie}
]

const imageToShow = id => imageMapper.find(player => player.id === id).name

class PlayersShowPage extends React.Component {

    state = {
        player: {}, 
        image: ""
    }


    componentDidMount(){
        if (localStorage.getItem("token")) {
            API.player(this.props.match.params.id)
                .then(player => this.setState({ 
                    player
                 }, () => this.setState({image: imageToShow(this.state.player.id)})
                 )  )
        } else {
            this.props.history.push("/login")
        }
    }

    render(){ 
        const { image, player } = this.state
        return (
            <SegmentGroup>
                <Segment>
                    <Image src={image} alt={player.name} size="medium" centered />
                    {player.name}
                </Segment>
            </SegmentGroup>
        )
    }

}

export default PlayersShowPage;