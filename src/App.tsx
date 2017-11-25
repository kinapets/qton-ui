import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-sun-sky';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import './App.css';
import * as Rx from 'rxjs'
import Block from './Block/Block';
import AzureService from './services/AzureService';

const tv = require('./models/tv.dae');
const sofa = require('./models/sofa/sofa.dae');

class App extends React.Component<any, any> {
    constructor(props: Object) {
        super(props);
        this.state = {
            position: 45
        }

        // TODO pass correct data
        AzureService.fetch();
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

                    {/*
                    <a-entity
                        geometry="primitive: box"
                        position="-1 0.5 -2"
                        rotation={`${this.state.position - 45} ${this.state.position} 1`}
                        material="color: #EF2D5E"
                        event-set__makevisible="_event: mouseenter; visible: false"
                    />
                    <a-entity
                        geometry="primitive: sphere; radius: 1.25;"
                        position="0 1.25 -5"
                        material="color: #EF2D5E"
                    />
                    <a-entity
                        geometry="primitive: cylinder; radius: 0.5, height: 1.5"
                        position="1 0.75 -3"
                        material="color: #FFC65D"
                    />*/}
                    <Block position={{x: 0, y: 0}}/>
                    <Block position={{x: 4, y: 0}}/>

                    <a-sun-sky></a-sun-sky>
                </a-scene>
            </div>
        );
    }
}

export default App;
