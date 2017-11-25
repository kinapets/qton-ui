import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-sun-sky';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import './App.css';
import * as Rx from 'rxjs'
import Block from './Block/Block';
import {createPosition} from './lib';
import {UNIT} from './types';
import {BlockProps, WallType} from './Block/BlockTypes';
import Room from './Room/Room'

const tv = require('./models/tv.dae');
const sofa = require('./models/sofa/sofa.dae');


class App extends React.Component<any, any> {
    constructor(props: Object) {
        super(props);
        this.state = {
            position: 45
        }
    }

    rotate() {
        this.setState({
            ...this.state,
            position: this.state.position + 0.1
        })
    }

    componentWillMount() {
        var source = Rx.Observable.timer(200, 2)
            .timeInterval()
            .pluck('interval');

        var subscription = source.subscribe(
            this.rotate.bind(this),
            function(err) {
                console.log('Error: ' + err);
            },
            function() {
                console.log('Completed');
            });
    }

    handleClick = () => {
        console.log('Clicked!');
      }

      handleCollide = () => {
        console.log('Collided!');
      }

    render() {
        return (
            <div className="App">
                <a-scene>
                    <a-camera wasd-controls="acceleration: 100; fly: false">
                        <a-cursor></a-cursor>
                    </a-camera>
                    <Room/>
                    <a-sun-sky></a-sun-sky>
                </a-scene>
            </div>
        );
    }
}

export default App;
