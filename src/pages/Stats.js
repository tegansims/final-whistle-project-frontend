import React from 'react';

class Stats extends React.Component {

    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }
    
    render(){
        return <div>    
            Stats Page
        </div>
    }

}

export default Stats;