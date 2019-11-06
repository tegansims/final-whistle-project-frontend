import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

class Stats extends React.Component {

    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }
    
    render(){
        return <div>    
            <Segment>Top Scorer</Segment>
            <Segment>Top Assister</Segment>
        </div>
    }

}

export default Stats;