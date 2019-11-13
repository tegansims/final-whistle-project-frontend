import React from 'react';
import Loading from '../components/Loading'
import { Segment, Header } from 'semantic-ui-react';

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
                <Header size='huge' className='center aligned segment' >
                Welcome! You aren't part of a team yet. <br></br> <br></br>
                Click on Settings to get started..
                </Header>
                </div>
            )
        
        } else {
            const { nextMatch} = this.props
            const {handleClick} = this
            return <div>
            <br></br><br></br><br></br><br></br>

                
            <Segment.Group className='center aligned segment'>
                
                <Header size='huge'>Welcome back!</Header>
                <Segment></Segment>
                {nextMatch &&  <Header as='h2' onClick={handleClick}>Your next game is against {nextMatch.opposition} on {nextMatch.date.split('T')[0]}</Header> }
                <Segment></Segment>
            </Segment.Group>
            </div>
        }
    }

}

export default Home;