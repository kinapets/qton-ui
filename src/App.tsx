import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-sun-sky';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import './App.css';
import * as Rx from 'rxjs'
import Block from './Block/Block';
import {createPosition} from './lib';
import {UNIT, Position} from './types';
import {BlockProps, WallType, WallEnum as Direction} from './Block/BlockTypes';
import Room from './Room/Room'
import {roomExample, PlaceType} from './Room/RoomTypes';
import * as _ from 'lodash';

/**
 * Localstorage props
 * heatmap - turn of/on heatmap
 * type - type of object to add
 *
 */

class App extends React.Component<any, any> {
    state: {clickedPosition: Position[], objects: {position: Position, type: PlaceType, direction: Direction}[], queue: {[key:string]: PlaceType}}
    constructor(props: Object) {
        super(props);
        this.state = {clickedPosition: [], objects: [], queue: {
            'sofa': PlaceType.sofa,
            'tv': PlaceType.tv
        }};
    }


    handleClick = (x: number, y: number) => {
        console.log('Clicked from App', x, y);

        if (localStorage.heatmap ) {
            console.log("Local storage heatmap is on");
        }
        this.setState({
            clickedPosition: this.state.clickedPosition.concat([{x,y}])
        });
        console.log(this.state);
        if (this.state.clickedPosition.length === 2) {
            const first = this.state.clickedPosition[0],
                second = this.state.clickedPosition[1];

            let obj = {position: {x: first.x, y: first.y}, type: this.state.queue[localStorage.type] || PlaceType.sofa}
            if (Math.abs(first.x - second.x) > Math.abs(first.y - second.y)) {
                if (first.x > second.x) {
                    console.log("Direction back");
                    this.setState({...this.state, objects: this.state.objects.concat([{...obj, direction: Direction.Back}])})
                } else {
                    console.log("Direction front");
                    this.setState({...this.state, objects: this.state.objects.concat([{...obj, direction: Direction.Front}])})
                }
            } else {
                if (first.y > second.y) {
                    console.log("Direction left");
                    this.setState({...this.state, objects: this.state.objects.concat([{...obj, direction: Direction.Left}])})
                } else {
                    console.log("Direction right");
                    this.setState({...this.state, objects: this.state.objects.concat([{...obj, direction: Direction.Right}])})
                }
            }
            this.setState({clickedPosition: []});
        }
    }



    render() {
        return (
            <div className="App">
                <a-scene>
                    <a-camera wasd-controls="acceleration: 100; fly: false">
                        <a-cursor></a-cursor>
                    </a-camera>
                    <Room handleClick={this.handleClick.bind(this)} room={roomExample}/>
                    <a-sun-sky></a-sun-sky>
                </a-scene>
            </div>
        );
    }
}

export default App;
