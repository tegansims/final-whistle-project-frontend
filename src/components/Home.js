import React, {Component} from 'react';

class Home extends React.Component {

    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }
    
    render(){
        return <div>
            Home
            </div>
    }

}

export default Home;