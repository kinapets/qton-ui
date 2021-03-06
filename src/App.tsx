import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-sun-sky';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import './App.css';
import * as Rx from 'rxjs'
import Block from './Block/Block';
import AzureService from './services/AzureService';
import DistanceService from './services/DistanceService';
// TODO maybe move to some common interfaces
import {PlaceType, RoomDefinition} from './common';
import {createPosition} from './lib';
import {UNIT, Position} from './types';
import {BlockProps, WallType, WallEnum as Direction} from './Block/BlockTypes';
import Room from './Room/Room'
import {heatmapExample, roomExample} from './Room/RoomTypes';
import * as _ from 'lodash';
import Places from './Places/Places';
/**
 * Localstorage props
 * heatmap - turn of/on heatmap
 * type - type of object to add
 * state - to hydraze state
 *
 */

// {"clickedPosition":[],"objects":[{"position":{"x":1,"y":1},"type":6,"direction":1},{"position":{"x":7,"y":4},"type":4,"direction":0},{"position":{"x":-1.72,"y":3},"type":9,"direction":1}],"queue":{"sofa":6,"tv":7,"coffeeTable":10,"table":4,"wardrobe":9,"flower":11}}

class App extends React.Component<any, any> {
    private heatmapExample:  number[][];
    state: {clickedPosition: Position[], objects: {position: Position, type: PlaceType, direction: Direction}[], queue: {[key:string]: PlaceType}}
    constructor(props: Object) {
        super(props);

        // TODO pass correct data

        // const roomExample: RoomDefinition = {
        //     definition: [
        //         [1, 1, 1, 1, 1, 1, 1, 1, 2, 1 ],
        //         [3, 0, 0, 0, 0, 2, 0, 0, 0, 1 ],
        //         [3, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
        //         [1, 0, 0, 0, 0, 3, 0, 0, 0, 3 ],
        //         [1, 0, 0, 0, 0, 3, 0, 0, 0, 1 ],
        //         [1, 0, 0, 0, 0, 1, 0, 0, 0, 3 ],
        //         [1, 1, 2, 1, 1, 1, 1, 1, 3, 1 ],
        //     ]
        // }

        // const flattenDistances = DistanceService.getDistances(roomExample, PlaceType.sofa);
        // // AzureService.fetchDataForSofa(flattenDistances)
        // .then(data => {
        //     const heatmapExample: number[][] = [];

        //     for(let i = 0; i < 8; i++) {
        //         // heatmapExample.push(_.slice(data.Results.output1, i, i+9).map(item => {
        //         //     const label = parseInt(item['Scored Labels']);
        //         //     const scoreProbab = parseFloat(item['Scored Probabilities']);

        //         //     return label * scoreProbab;
        //         // }));
        //         heatmapExample.push([]);
        //         for(let j = 0; j < 10; j++) {
        //             const label = parseInt(data.Results.output1[i
        //                  * 10 + j]['Scored Labels']);
        //             const scoreProbab = parseFloat(data.Results.output1[i * 10 + j]['Scored Probabilities']);

        //             heatmapExample[i].push(label * scoreProbab);
        //         }
        //     }
        //     console.log(heatmapExample);
        //     this.heatmapExample = heatmapExample;
        // });

        localStorage.state = 1;
        this.state = !localStorage.state ? {clickedPosition: [], objects: [], queue: {
            'sofa': PlaceType.sofa,
            'tv': PlaceType.tv,
            'coffeeTable': PlaceType.coffeeTable,
            'table': PlaceType.table,
            'wardrobe': PlaceType.wardrobe,
            'flower': PlaceType.flower,
        }} : {"clickedPosition":[],"objects":[{"position":{"x":1,"y":1},"type":6,"direction":1},{"position":{"x":7,"y":4},"type":4,"direction":0},{"position":{"x":-1.72,"y":3},"type":9,"direction":1},{"position":{"x":0.5,"y":8},"type":11,"direction":1}],"queue":{"sofa":6,"tv":7,"coffeeTable":10,"table":4,"wardrobe":9,"flower":11}};
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
            this.setState({...this.state, clickedPosition: []});
            console.log(JSON.stringify(this.state));
        }
    }



    render() {
        return (
            <div className="App">
                <a-scene>
                <a-entity id="myCameraPosition" position="3.336 0 5.949" rotation="0 20 0">
                    <a-camera wasd-controls="acceleration: 100; fly: false">
                        <a-cursor></a-cursor>
                    </a-camera>
                    </a-entity>
                    <Room handleClick={this.handleClick.bind(this)} room={roomExample} heatmap={heatmapExample}/>
                    <Places places={this.state.objects}/>
                    <a-sun-sky></a-sun-sky>
                </a-scene>
            </div>
        );
    }
}

export default App;
