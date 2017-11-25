import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import {Position, UNIT, WALL_DEPTH} from '../types'
import {createPosition} from '../lib'
const door = require('./door2.dae');
const texture = require('./wall-texture.jpg');

export enum WallEnum {
    Left,
    Right,
    Front,
    Back,
}

interface WallProps {
    type: WallEnum,
    blockPosition: Position
}

class Wall extends React.Component<any, any> {
    props: WallProps;

    getGeometry(type: WallEnum) {
        if (type === WallEnum.Front || type === WallEnum.Back) {
            return {primitive: 'box', width: UNIT, depth: WALL_DEPTH, height: UNIT}
        } else {
            return {primitive: 'box', width: WALL_DEPTH, depth: UNIT, height: UNIT}
        }
    }

    getPosition(type: WallEnum) {
        const {x, y} = this.props.blockPosition
        switch (type) {
            case WallEnum.Front:
                return createPosition({x: x + UNIT / 2, y: UNIT / 2, z: y - WALL_DEPTH / 2});
            case WallEnum.Back:
                return createPosition({x: x + UNIT / 2, y: UNIT / 2, z: y - UNIT + WALL_DEPTH / 2});
            case WallEnum.Left:
                return createPosition({x: x + WALL_DEPTH / 2, y: UNIT / 2, z: y - UNIT / 2});
            default:
                return createPosition({x: x + UNIT, y: UNIT / 2, z: y - UNIT / 2});
        }
    }

    render() {
        const {x, y} = this.props.blockPosition,
            {type} = this.props,
            geometry = this.getGeometry(type),
            position = this.getPosition(type);
        return (
            <Entity id="Wall">
                <Entity id="FrontWall"
                    geometry={geometry}
                    position={position}
                    rotation="0 0 0"
                    material={`src: url(${texture})`}
                />
                 <a-entity position={createPosition({x: x + UNIT / 2, y: 0, z: y - 0.07})} scale="0.9 0.9 0.9" collada-model={`url(${door})`}></a-entity>
                <a-entity position={createPosition({x: x + UNIT / 2, y: 0, z: y - UNIT + 0.07})} rotation="0 180 0" scale="0.9 0.9 0.9" collada-model={`url(${door})`}></a-entity>
                {/* <a-entity position={createPosition({x: x + UNIT, y: 0, z: (y - UNIT /2) - 0.14})} rotation="0 90 0" scale="0.9 0.9 0.9" collada-model={`url(${door})`}></a-entity> */}
            </Entity>
        );
    }
}

export default Wall;
