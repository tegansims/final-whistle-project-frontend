import React from 'react';
import { Segment, Icon, Grid, Divider, Header} from 'semantic-ui-react';
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

    changeScorerState=()=> {
        console.log('change scorer state clicked')
        this.setState({showScorers: !this.state.showScorers, showAssisters: false})
    }
    changeAssisterState=()=> this.setState({showAssisters: !this.state.showAssisters, showScorers: false})
    
    
    render(){
        return <Segment.Group>    
           <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical></Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column className='center aligned segment' onClick={this.changeScorerState}>
                    <Header icon  >Top Scorer: </Header>
                    <h2>{this.state.top_scorer}</h2>
                    <Icon    name='caret right' />
                    </Grid.Column>
                        
                    <Grid.Column className='center aligned segment' onClick={this.changeAssisterState}>
                    <Header icon >Top Assister: </Header>
                    <h2 >{this.state.top_assister}</h2>
                    <Icon   name='caret right' />
                    </Grid.Column>
                </Grid.Row>
             </Grid>
            </Segment>
           <div></div>

           { this.state.showScorers && <Grid style={{color:'white'}}>
           <Grid.Row columns={2}>
                <Grid.Column className='center aligned segment'>
                {this.state.top_scorers.map(scorer => <h3 key={scorer.id}>{scorer[1]}</h3>)}
                </Grid.Column>
                <Grid.Column>
                {this.state.top_scorers.map(scorer => <h3 key={scorer.id}>{scorer[0]}</h3>)}
                </Grid.Column>
            </Grid.Row>    
            </Grid>
        }

            { this.state.showAssisters && <Grid style={{color:'white'}}>
           <Grid.Row columns={2}>
                <Grid.Column className='center aligned segment'>
                {this.state.top_assisters.map(assister => <h3 key={assister.id}>{assister[1]}</h3>)}
                </Grid.Column>
                <Grid.Column>
                {this.state.top_assisters.map(assister => <h3 key={assister.id}>{assister[0]}</h3>)}
                </Grid.Column>
            </Grid.Row>    
            </Grid>
        }

            </Segment.Group>
    }

}

export default Stats;