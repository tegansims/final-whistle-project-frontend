import React from 'react';
import {Layer, Image, Stage, Circle, Line} from 'react-konva'
import { isBlock } from '@babel/types';
import useImage from 'use-image';
import { Button, Dropdown, Form, Icon, Segment} from 'semantic-ui-react';
import Loading from '../components/Loading'
import API from '../adaptors/API'
// import hockey_pitch from './'


const PitchImage = () => {
    const [image] = useImage('https://hi-static.z-dn.net/files/d6c/36f6579de2f3bcf58c6d5c4491cf7ba0.jpg');
    return <Image image={image} 
    // width={window.innerWidth} 
    />;
  };


class Tactics2 extends React.Component {

    state = {
        options: false,
        boards: [],
        isDragging: false,
        items: [],
        showBlank: false,
        redItems: [],
        blueItems: [],
        newBoard: [], 
        name: ''

    };

   componentDidMount(){
       API.boards().then(boards =>  this.setState({  boards: boards }) )
   }

   loadBoard=(board, color='ff0')=> {
        const items = []
        for (let i=0; i < board.length; i++) {
            for (let j=1; j < board[i].length; j=j+2){
                items.push({
                    x: board[i][j],
                    y: board[i][j+1],
                    id: `node-${board[i][0]}-${j}`,
                    color: board[i][0] === 'blue' ? '#2299e2' : '#B01943'
                })
                this.setState({
                     newBoard: {
                         ...this.state.newBoard,
                         [`node-${board[i][0]}-${j}`]:  {
                            x: board[i][j],
                            y: board[i][j+1]
                         } 
                     }
                 })
            };   
        }
    return items
}


   mappedBoards = () => {
       let teamBoards = this.state.boards.filter(board => board.team_id === this.props.currentUser.team_id)
        let output = teamBoards.map(board => {
            return {key: board.id, value:board.id, text: board.name }
        })
        return output.sort((a,b) => a.text.localeCompare(b.text))
}
    
    handleClick = (board) => {
    this.setState({
        items: this.loadBoard(board),
        showBlank: false
        })
    }



   

   handleDropdownChange = (event, data) => {
    this.setState({newBoard: []}, () => 
    API.boardCoords(data.value).then(coords =>  this.setState({  
         items: this.loadBoard(coords),
         showBlank: false
     }) )
    )
    }

    handleChange = event => this.setState({ [event.target.name]: event.target.value })

    handleSaveAsClick = (event) => {
        console.log(this.state.newBoard)
        event.preventDefault()
        let boardToCreate = {
            team_id: this.props.currentUser.team_id, 
            coordinates: this.state.newBoard, 
            name: this.state.name
        }
        API.createBoard(boardToCreate).then(this.props.pushUserUpdateToState(this.props.currentUser.id) )
        
    } 

    handleIconClick = () => {
        console.log('clicking')
        this.setState({options: !this.state.options})
    }

    newBoardNameUniqueness = (name) => {
        let allTeamBoards = this.state.boards.filter(board => board.team_id === this.props.currentUser.team_id)
        let allTeamBoardsNames = allTeamBoards.map(board => board.name)

        return allTeamBoardsNames.includes(name)
      }

    onDragEnd =(e) => {
        this.setState({
            isDragging: false,
            newBoard: {
                ...this.state.newBoard,
                [e.target.attrs.name]: {
                x: e.target.x(),
                y: e.target.y()
                }        
            }
        
        });
    } 

    render() { 
        if (!this.props.currentUser) {
            return  <Loading/>
        } else { 
            return ( <div>
                <Segment.Group className='center aligned segment'>
         <Segment onClick={this.handleIconClick} textAlign='center'> {this.state.options ? <Icon disabled name='angle double up'  link /> : <Icon name='angle double down'/>}
         </Segment>
               {this.state.options && <Form>
            <Dropdown
                labeled
                floating
                selection
                search
                options={this.mappedBoards()}
                name='team'
                placeholder='choose a board to load'
                onChange={this.handleDropdownChange}>
            </Dropdown> 
         <br></br>
         <input type='text'
                id='name'
                label='name'
                value={this.state.name}
                onChange={this.handleChange}
                name='name'
                placeholder='name of your new board'
            />
         {!this.newBoardNameUniqueness(this.state.name) && this.state.name ? <Button onClick={this.handleSaveAsClick}>Save As</Button> : <Button disabled>Save As</Button> }

         {/* <Button>Save Changes</Button> */}
        </Form> }
        </Segment.Group>

        <div className='pitch'>
            <Stage width={window.innerWidth} height={window.innerHeight} border={isBlock}>
            <Layer  >

            {!this.state.showBlank && this.state.items.map(item => (
                <Circle
                    key={item.id}
                    name={item.id}
                    draggable
                    x={item.x}
                    y={item.y}
                    fill={item.color}
                    radius={10}
                    onDragEnd={this.onDragEnd}
                />
                ))}


            {this.state.showBlank && this.state.redItems.map(item => (
                <Circle
                    key={item.id}
                    name={item.id}
                    draggable
                    x={item.x}
                    y={item.y}
                    fill={item.color}
                    radius={10}
                    onDragEnd={this.onDragEnd}
                
                />
                ))}
                {this.state.showBlank && this.state.blueItems.map(item => (
                <Circle
                    key={item.id}
                    name={item.id}
                    draggable
                    x={item.x}
                    y={item.y}
                    fill={item.color}
                    radius={10}
                    onDragEnd={this.onDragEnd}
                />
                ))}
            
                </Layer>
                </Stage>
           
            </div>
            </div>

        );
        } }
    }
    export default Tactics2;