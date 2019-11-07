import React from 'react';
import { Segment, Button, Table, Header } from 'semantic-ui-react';
import API from '../adaptors/API'


class Stats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            top_scorer: [], 
            top_scorers: [], 
            team_id: '',
            currentUser: this.props.currentUser, 
            showScorers: false,
            showAssists: false
        }
    }

    componentDidMount () {
        console.log(this.state.currentUser)
        if (localStorage.getItem("token")) {
        API.topScorer(this.state.currentUser.team_id).then(scorer => {
            API.topScorers(this.state.currentUser.team_id).then(scorers => {
                console.log(scorers)
                this.setState({ top_scorers: scorers, top_scorer: scorer }
                )})
            })
        } else {
            this.props.history.push("/login")
        }
    }

    changeState=()=> this.setState({showScorers: !this.state.showScorers})
    
    
    render(){
        return <div>    
            <Segment onClick={this.changeState}>Top Scorer: {this.state.top_scorer}</Segment>
            {this.state.showScorers &&
                <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Player</Table.HeaderCell>
                        <Table.HeaderCell>Goals</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.top_scorers.map(scorer => <Table.Row><Table.Cell>{scorer[0]}</Table.Cell><Table.Cell>{scorer[1]}</Table.Cell></Table.Row>)}
                    {/* {this.state.top_scorers.map(scorer => <Table.Row><Table.Cell><Header.Content>{scorer[1]}</Header.Content></Table.Cell></Table.Row>)} */}
                </Table.Body>
                </Table>
            }
            <Segment>Top Assister</Segment>

        </div>
    }

}

export default Stats;