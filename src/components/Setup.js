import React, {Component} from 'react';

class Setup extends React.Component {

    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }
    
    render(){
        return <div>
            Setup
        </div>
    }

}

export default Setup;