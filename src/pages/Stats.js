import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import API from '../adaptors/API'


class Stats extends React.Component {

    state = {
        top_scorer: [], 
        top_scorers: [], 
        team_id: ''
    }

    componentDidMount () {
        // if (!this.props.username) {
        //     this.props.history.push('/login')
        // }
        console.log(this.props.currentUser)
        API.topScorer(this.props.currentUser).then(scorer => {
            console.log(scorer)
            this.setState({ top_scorer: scorer })
        })
        
    }
    
    render(){
        return <div>    
            <Segment>Top Scorer</Segment>
            <Segment>Top Assister</Segment>
        </div>
    }

}

export default Stats;