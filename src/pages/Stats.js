import React from 'react';
import { Segment, Icon, Table, Grid, Divider, Header} from 'semantic-ui-react';
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
        if (localStorage.getItem("token")) {
        API.topScorer(this.props.match.params.id).then(scorer => {
            API.topScorers(this.props.match.params.id).then(scorers => {
                this.setState({ top_scorers: scorers, top_scorer: scorer }
                )})
            })
        API.topAssister(this.props.match.params.id).then(assister => {
            API.topAssisters(this.props.match.params.id).then(assisters => {
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
        return <Segment.Group>    
            {/* <Segment size='huge' className='center aligned segment' onClick={this.changeScorerState}><strong>Top Scorer: </strong> {this.state.top_scorer}  <Icon disabled name='caret right' /></Segment>
            <Segment size='huge' className='center aligned segment' onClick={this.changeAssisterState}><strong>Top Assisters: </strong> {this.state.top_assister}  <Icon disabled name='caret right' /></Segment> */}
           <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical></Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                    <Header icon  onClick={this.changeScorerState}>
                        <strong>Top Scorer: </strong> <br></br> {this.state.top_scorer}  <Icon  size='small' name='caret right' />
                    </Header>
                    </Grid.Column>
                        
                    <Grid.Column>
                    <Header icon onClick={this.changeAssisterState}>
                        <strong>Top Assisters: </strong> <br></br> {this.state.top_assister}  <Icon   size='small' name='caret right' />
                    </Header>
                    </Grid.Column>
                </Grid.Row>
             </Grid>
            </Segment>
           <div></div>


            {this.state.showScorers &&
                <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell  >Player</Table.HeaderCell>
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

            </Segment.Group>
    }

}

export default Stats;