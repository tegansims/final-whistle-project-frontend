import React from 'react';
import { Segment, Button, Table, Header } from 'semantic-ui-react';
import API from '../adaptors/API'


class Stats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            top_scorer: [], 
            top_scorers: [], 
            top_assister: [], 
            top_assisters: [],
            team_id: '',
            currentUser: this.props.currentUser, 
            showScorers: false,
            showAssisters: false
        }
    }

    componentDidMount () {
        console.log(this.state.currentUser)
        if (localStorage.getItem("token")) {
        API.topScorer(this.props.match.params.id).then(scorer => {
            API.topScorers(this.props.match.params.id).then(scorers => {
                console.log(scorers)
                this.setState({ top_scorers: scorers, top_scorer: scorer }
                )})
            })
        API.topAssister(this.props.match.params.id).then(assister => {
            API.topAssisters(this.props.match.params.id).then(assisters => {
                console.log(assisters)
                this.setState({ top_assisters: assisters, top_assister: assister }
                )})
            })
        } else {
            this.props.history.push("/login")
        }
    }

    changeScorerState=()=> this.setState({showScorers: !this.state.showScorers, showAssisters: false})
    changeAssisterState=()=> this.setState({showAssisters: !this.state.showAssisters, showScorers: false})
    
    
    render(){
        return <div>    
            <Segment onClick={this.changeScorerState}>Top Scorer: {this.state.top_scorer}</Segment>
            <Segment onClick={this.changeAssisterState}>Top Assisters: {this.state.top_assister}</Segment>
            {this.state.showScorers &&
                <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Player</Table.HeaderCell>
                        <Table.HeaderCell>Goals</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.top_scorers.map(scorer => <Table.Row><Table.Cell key={scorer.id}>{scorer[0]}</Table.Cell><Table.Cell>{scorer[1]}</Table.Cell></Table.Row>)}
                </Table.Body>
                </Table>
            }
            
            {this.state.showAssisters &&
                <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Player</Table.HeaderCell>
                        <Table.HeaderCell>Assists</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.top_assisters.map(assister => <Table.Row><Table.Cell key={assister.id}>{assister[0]}</Table.Cell><Table.Cell>{assister[1]}</Table.Cell></Table.Row>)}
                </Table.Body>
                </Table>
            }

        </div>
    }

}

export default Stats;