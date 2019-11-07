import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import API from '../adaptors/API'


class Stats extends React.Component {

    state = {
        top_scorer: [], 
        top_scorers: [], 
        team_id: '',
        currentUser: this.props.currentUser
    }

    componentDidMount () {
        console.log(this.state.team_id)
        console.log(this.props.currentUser)
        // this.setState({team_id: this.props.currentUser.team_id}, () => console.log(this.state.team_id))
        // if (!this.props.username) {
        //     this.props.history.push('/login')
        // }
        // API.topScorer(this.props.currentUser.team_id).then(scorer => {
        //     console.log(scorer)
        //     this.setState({ top_scorer: scorer }

        //     )})
        // })
        
    }
    
    render(){
        return <div>    
            <Segment>Top Scorer</Segment>
            <Segment>Top Assister</Segment>
        </div>
    }

}

export default Stats;