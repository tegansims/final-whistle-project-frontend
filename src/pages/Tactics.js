import React from 'react';
import {Layer, Image, Stage, Circle, Rect} from 'react-konva'
import { isBlock } from '@babel/types';
import useImage from 'use-image';

const generateItems = (color) => {
    const items = [];
    for (let i = 0; i < 11; i++) {
        items.push({
            x: 30,
            y: (Math.random() * window.innerHeight / 2) + 30,
            id: `node-${color}-${i}`,
            color: color
        });
    }
    return items;
}

const PitchImage = () => {
    const [image] = useImage('https://hi-static.z-dn.net/files/d6c/36f6579de2f3bcf58c6d5c4491cf7ba0.jpg');
    return <Image image={image} height={window.innerHeight} x={0}/>;
  };


class Tactics extends React.Component {
    
    componentDidMount () {
        if (!this.props.username) {
            this.props.history.push('/login')
        }
    }
    
    state = {
        isDragging: false,
        redItems: generateItems('#B01943'),
        blueItems: generateItems('#2299e2'),
        image: '../src/images/hockey-pitch-copy.svg',
        x: 100,
        y: 100

    };

    render() {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight} border={isBlock}>
        <Layer  >
        <PitchImage />
        {/* the big blue circle that has no meaning but does make note of the x and y axes */}
        {/* <Circle radius={50} fill={'blue'} x={this.x} y={this.y} draggable 
            onDragStart={() => this.setState({ isDragging: true })}
            onDragEnd={e => {
              this.setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y()
              });
            }} /> */}
        {this.state.redItems.map(item => (
            <Circle
                key={item.id}
                name={item.id}
                draggable
                x={item.x}
                y={item.y}
                fill={item.color}
                radius={20}
            //   onDragStart={this.handleDragStart}
            //   onDragEnd={this.handleDragEnd}
            />
            ))}
            {this.state.blueItems.map(item => (
            <Circle
                key={item.id}
                name={item.id}
                draggable
                x={item.x}
                y={item.y}
                fill={item.color}
                radius={20}
            //   onDragStart={this.handleDragStart}
            //   onDragEnd={this.handleDragEnd}
            />
            ))}

        </Layer>
        </Stage>
    );
    }
}

export default Tactics;