import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import Wall from './Wall';
import {WallEnum, WallType, BlockProps, WallProps} from './BlockTypes';
import {Position, UNIT} from '../types';

const floor = require('./floor-texture.jpg');


class Block extends React.Component<any, any> {
    props: BlockProps;


    handleClick = () => {
        console.log('Clicked!');
    }

    handleCollide = () => {
        console.log('Collided!');
    }

    render() {
        const {x, y} = this.props.position;
        const {back, front, left, right} = this.props;
        return (
            <Entity>
                {back && <Wall blockPosition={{x, y}} direction={WallEnum.Back} type={back} />}
                {front && <Wall blockPosition={{x, y}} direction={WallEnum.Front} type={front} />}}
                {right && <Wall blockPosition={{x, y}} direction={WallEnum.Right} type={right} />}
                {left && <Wall blockPosition={{x, y}} direction={WallEnum.Left} type={left} />}

                <a-entity
                    geometry={`primitive: plane; width: ${UNIT}; height: ${UNIT}`}
                    position={`${x + UNIT / 2} 0 ${y - UNIT / 2}`}
                    rotation="-90 0 0"
                    material={`src: ${floor}`}
                />
            </Entity>
        );
    }
}

export default Block;
