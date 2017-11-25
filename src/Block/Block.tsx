import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import Wall from './Wall';
import {WallEnum, WallType, BlockProps, WallProps} from './BlockTypes';
import {Position, UNIT} from '../types';
import * as _ from 'lodash';

const floor = require('./floor2.jpg');


class Block extends React.Component<any, any> {
    props: BlockProps;


    handleClick = () => {
        this.props.handleClick(this.props.position.x, this.props.position.y);
    }

    handleCollide = () => {
        console.log('Collided!');
    }

    render() {
        const {x, y} = this.props.position;
        const {back, front, left, right} = this.props;
        return (
            <Entity>
                {_.isNumber(back) && <Wall blockPosition={{x, y}} direction={WallEnum.Back} type={back} />}
                {_.isNumber(front) && <Wall blockPosition={{x, y}} direction={WallEnum.Front} type={front} />}}
                {_.isNumber(right) && <Wall blockPosition={{x, y}} direction={WallEnum.Right} type={right} />}
                {_.isNumber(left) && <Wall blockPosition={{x, y}} direction={WallEnum.Left} type={left} />}

                <Entity
                    geometry={`primitive: plane; width: ${UNIT}; height: ${UNIT}`}
                    position={`${x + UNIT / 2} 0 ${y - UNIT / 2}`}
                    rotation="-90 0 0"
                    material={`src: ${floor}`}
                    events={{
                        click: this.handleClick.bind(this),
                        collided: [this.handleCollide]}}
                />
            </Entity>
        );
    }
}

export default Block;
