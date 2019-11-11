import React from 'react';
import {Layer, Image, Stage, Circle, Rect} from 'react-konva'
import { isBlock } from '@babel/types';
import useImage from 'use-image';
import { Button, Dropdown, Form} from 'semantic-ui-react';
import Loading from '../components/Loading'
import API from '../adaptors/API'


const boardOne =  [ 25, 50, 50, 100, 75, 150, 100, 60]

const boardTwo = [ 14, 42,47, 80,73, 49]

const loadBoard=(board)=> {
    const items = []
    for (let i = 0; i < board.length; i=i+2) {
        items.push({
            x: board[i],
            y: board[i+1],
            id: `node-${i}`,
            color: 'yellow'
            
        })
    }
    console.log(items)
    return items
}

const generateItems = (color, y) => {
    const items = [];
    for (let i = 0; i < 11; i++) {
        items.push({
            x: 10,
            y: y,
            id: `node-${color}-${i}`,
            color: color
        });
    }
    return items;
}

const PitchImage = () => {
    const [image] = useImage('https://hi-static.z-dn.net/files/d6c/36f6579de2f3bcf58c6d5c4491cf7ba0.jpg');
    return <Image image={image} 
    // width={window.innerWidth} 
    />;
  };


class Tactics2 extends React.Component {

    state = {
        boards: [],
        isDragging: false,
        items: [],
        showBlank: false,
        redItems: [],
        blueItems: []

    };

   componentDidMount(){
       API.boards().then(boards =>  this.setState({  boards: boards }) )
   }

   mappedBoards = () => {
       let teamBoards = this.state.boards.filter(board => board.team_id === this.props.currentUser.team_id)
        let output = teamBoards.map(board => {
            return {key: board.id, value:board.id, text: board.name }
        })
        console.log(output)
        return output.sort((a,b) => a.text.localeCompare(b.text))
}

   handleClick = (board) => {
       this.setState({
           items: loadBoard(board),
           showBlank: false
        })
   }

   handleBlankClick = () => {
       this.setState({
        showBlank: !this.state.showBlank,
        redItems: generateItems('#B01943', 10),
        blueItems: generateItems('#2299e2', 35)
    })
   }

   handleDropdownChange = (event, data) => {
       console.log(data)
       API.boardCoords(data.value).then(coords =>  this.setState({  
            items: loadBoard(coords),
            showBlank: false
        }) )
    }




    render() { 
        if (!this.props.currentUser) {
            return  <Loading/>
        } else { 
    return ( <div>
        <Form>
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
         <Button onClick={this.handleBlankClick}>Load New</Button>
         <Button>Save</Button>
         </Form>
        <Stage width={window.innerWidth} height={window.innerHeight} border={isBlock}>
        <Layer  >
        <PitchImage />

        {!this.state.showBlank && this.state.items.map(item => (
            <Circle
                key={item.id}
                name={item.id}
                draggable
                x={item.x}
                y={item.y}
                fill={item.color}
                radius={10}
                onDragEnd={e => {
                    this.setState({
                      isDragging: false,
                      x: e.target.x(),
                      y: e.target.y()
                    });
                }}
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
                onDragEnd={e => {
                    this.setState({
                      isDragging: false,
                      x: e.target.x(),
                      y: e.target.y()
                    });
                }}
            />
            ))}
        
        </Layer>
        </Stage>
       
        </div>
    );
    } }
}

export default Tactics2;