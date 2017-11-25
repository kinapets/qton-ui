import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import {WallEnum, WallType, BlockProps, WallProps} from '../Block/BlockTypes';
import Block from '../Block/Block';


class Room extends React.Component<any, any> {
    props: any;


    render() {

        return (
            <Entity>
                <Block position={{x: 0, y: 0}} left={WallType.door}/>
                <Block position={{x: 1, y: 0}}/>
            </Entity>
        );
    }
}

export default Room;
