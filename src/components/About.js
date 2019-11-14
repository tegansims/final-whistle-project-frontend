import React from 'react';
import {  } from 'semantic-ui-react';

const style = {
    color: "white",
    textAlign: 'center'
}

const height ={
    minHeight: 60
}

class About extends React.Component {

    state = {
        getStarted: true,
        createTeam: false,
        createPlayer: false,
        createGame: false,
        joinTeam: false, 
        linkAccount: false
    }

    handleClick = (item) =>  this.setState({ 
            getStarted: false,
            createTeam: false,
            createPlayer: false,
            createGame: false,
            joinTeam: false, 
            linkAccount: false
        }, () => this.setState({[item]: !this.state[item]})
    ) 


    render(){
        const { handleClick } = this
        const {getStarted, createTeam, createPlayer, createGame, joinTeam, linkAccount} = this.state
        return (
        <div>
            <div style={height}></div>
            <div style={style}>
            <h1>Welcome to Full Time, the app that lets you track your team's data. </h1>

           

           {getStarted && <h3 onClick={()=>handleClick('getStarted')}> <br></br>
            To get started, head over to the Settings tab, where you can either join a team or create a new one. <br></br>
            </h3> }

            <h4><span onClick={()=>handleClick('createTeam')} >Creating a team  </span> 
                || <span onClick={()=>handleClick('createPlayer')} >Creating a Player  </span> 
                || <span onClick={()=>handleClick('createGame')}> Creating a Game</span></h4>

            <h4><span onClick={()=>handleClick('joinTeam')}>Joining a team  </span>
            || <span onClick={()=>handleClick('linkAccount')} >Linking an account  </span> </h4> 
            <p>- - - - -</p> 

            {createTeam && <div>
                <h2> Creating a team: </h2>
                <h3> When you create a team, the app will ask you to set a <span style={{color: '#B01943'}}> team password </span>. 
                Make a note of this password, as anyone who wants to join your team (players, supporters, coaches, overbearing parents) will need it to sign in.
                </h3>
                <h3>
                <span style={{color: '#B01943'}}>Warning!</span>You can only be a member of one team, so if you are already part of a team and you create a new one, you will lose access to your old team's data.
                </h3>
                <h3>
                Creating a team will automatically give you admin privileges. Once a team is created, you can then create your players and your games. 
                </h3>
                </div>
            }

            {createPlayer && <div>
            <h2> Creating a Player: </h2>
            <h3>
                Once you've created a team, you can then create players for that team, under the Settings tab. A name is all that is required here!
            </h3>
            <h3>
                Creating players will allow you to log which players scored or assisted, and will allow members of your team to vote for them for Man of the Match.
            </h3>
            </div>
            }

            {createGame && <div>
            <h2> Creating a Game: </h2>
            <h3>
                Once you've created a team, you can then create games for that team, under the Settings tab. 
            </h3>
            <h3>
                You'll be asked to enter a date and time, a venue and the name of the opposition team.
            </h3>
            <h3>
                Once created, the games will appear in your Games tab.
            </h3>
            </div>
            }

            {joinTeam && <div>
            <h2> Joining a team: </h2>
            <h3>
                Got your team password?
            </h3>
            <h3>
                Head to the Settings tab and click on Join Team. 
            </h3>
            <h3>
                Once you've joined a team you'll be able to see all the games, players, stats and tactics for that team.
            </h3>
            <h3>
                <span style={{color: '#B01943'}}>Warning!</span> You can only be a member of one team, so if you are already part of a team and you create a new one, you will lose access to your old team's data.
            </h3>
            </div>
            }

            {linkAccount && <div>
            <h2> Linking an account: </h2>
            <h3>
                Got your team password?
            </h3>
            <h3>
                Head to the Settings tab and click on Join Team. Enter the team password and you'll be taken to the Link page. 
            </h3>
            <h3>
                Here, you can select the capacity in which you are a member of this team. If you're a player, you'll be able to link your player account from the dropdown menu.
            </h3>
            <h3>
                Reenter the team password and your account will be linked!
            </h3>
            </div>
            }   
        </div>
        </div>
            
        )
    }

}

export default About;