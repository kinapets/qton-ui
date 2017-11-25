import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import {WallEnum, WallType, BlockProps, WallProps} from '../Block/BlockTypes';
import Block from '../Block/Block';
import {RoomDefinition, PlaceDefinition, PlaceType} from './RoomTypes';
import {transformForRender} from './trasform-for-render';
import {createPosition} from "../lib";
import * as _ from 'lodash';


interface RoomProps {
    room: RoomDefinition;
    handleClick: Function;
}

interface RoomState {
    places: PlaceDefinition[];
}


class Room extends React.Component<any, any> {
    props: RoomProps;
    handleClick: Function;

    constructor(props: RoomProps) {
        super(props);
        this.state = {places: transformForRender(this.props.room)};

    }

    renderBlock(place: PlaceDefinition, index: number) {
        let walls = {};
        if (place.currentPlace === null) return;
        if (place.edges) {
            const {back, front, left, right} = place.edges;
            walls = _.isNumber(back) ? {...walls, back} : walls;
            walls = _.isNumber(front) ? {...walls, front} : walls;
            walls = _.isNumber(left) ? {...walls, left} : walls;
            walls = _.isNumber(right) ? {...walls, right} : walls;
        }


        return (
            <Entity key={`block${place.m}:${place.n}`}>
                <Block handleClick={this.props.handleClick} position={{x: place.m, y: place.n}} {...walls}/>
            </Entity>
        );
    }

    render() {
        const {definition} = this.props.room
        return (
            <Entity>
                {this.state.places.map(this.renderBlock.bind(this))}
            </Entity>
        );
    }
}

export default Room;
