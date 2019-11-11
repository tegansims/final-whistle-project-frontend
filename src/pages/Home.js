import React from 'react';
import Loading from '../components/Loading'
import { Segment } from 'semantic-ui-react';

class Home extends React.Component {


    componentDidMount () {
        if (!localStorage.getItem("token")) {
            this.props.history.push('/login')
        }
    }
  

    token = () => {
        localStorage.getItem('token')
    }

    handleClick = () => {this.props.history.push(`/games/${this.props.nextMatch.id}`)}

    render(){ 
        if (!this.props.currentUser) {
        return (
          <Loading/>
        )
        } if (this.props.currentUser && !this.props.currentUser.team_id) {
        return ( <div>
            <Segment size='huge' className='center aligned segment' >
            Welcome! You aren't part of a team yet. <br></br> <br></br>
            Click on Settings to get started..
            </Segment>
            </div>
        )
        
      } else {
        const {history, currentUser, nextMatch} = this.props
        const {handleClick} = this
        return <Segment.Group className='center aligned segment'>

            

            <Segment></Segment>
             <Segment size='huge'>Welcome back!</Segment>
             <Segment></Segment>
            {nextMatch &&  <Segment onClick={handleClick}>Your Next Game is against {nextMatch.opposition} on {nextMatch.date.split('T')[0]}</Segment> }
             <Segment></Segment>
            </Segment.Group>
       }
    }

}

export default Home;