import React, {Component} from 'react';

class Settings extends React.Component {

    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }
    
    render(){
        return <div>
            Settings
        </div>
    }

}

export default Settings;