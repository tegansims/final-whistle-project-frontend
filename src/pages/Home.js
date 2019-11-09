import React from 'react';
import Loading from '../components/Loading'
import { Segment } from 'semantic-ui-react';

class Home extends React.Component {


    
    // RENDER LOGIC:
    // if no token
        // login/signup 
    // if token and !this.props.username and !user.team_id
        // setup
    // else (token and this.props.username and user.team_id)
        // home 

    token = () => {
        localStorage.getItem('token')
    }

    handleClick = () => {this.props.history.push(`/games/${this.props.nextMatch.id}`)}

    render(){ 
        if (!this.props.nextMatch) {
        return (
          <Loading/>
        )
      } else {
        const {history, currentUser, nextMatch} = this.props
        const {handleClick} = this
        return <Segment.Group className='center aligned segment'>

            {!this.token && history.push('/login')}

            <Segment></Segment>
             <Segment size='huge'>Welcome back!</Segment>
             <Segment></Segment>
             <Segment onClick={handleClick}>Your Next Game is against {nextMatch.opposition} on {nextMatch.date.split('T')[0]}</Segment>
             <Segment></Segment>
            </Segment.Group>
       }
    }

}

export default Home;