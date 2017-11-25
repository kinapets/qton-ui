import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import {Position, UNIT, WALL_DEPTH} from '../types'
import {createPosition} from '../lib'
import {WallEnum, WallType, WallProps} from "./BlockTypes";

const door = require('./door2.dae');
const texture = require('./wall-text.jpg');
const window = require('./window.dae');


class Wall extends React.Component<any, any> {
    props: WallProps;


    /**
     * Geometry for wall
     */
    getGeometry(direction: WallEnum) {
        if (direction === WallEnum.Front || direction === WallEnum.Back) {
            return {primitive: 'box', width: UNIT, depth: WALL_DEPTH, height: 2 * UNIT}
        } else {
            return {primitive: 'box', width: WALL_DEPTH, depth: UNIT, height: 2 * UNIT}
        }
    }
    /**
     * Geometry for wall - for windows purpose
     */
    getGeometryHalfWall(direction: WallEnum) {
        if (direction === WallEnum.Front || direction === WallEnum.Back) {
            return {primitive: 'box', width: UNIT, depth: WALL_DEPTH, height: UNIT}
        } else {
            return {primitive: 'box', width: WALL_DEPTH, depth: UNIT, height: UNIT}
        }
    }
    /**
     * Position of wall
     */
    getPosition(direction: WallEnum) {
        const {x, y} = this.props.blockPosition
        switch (direction) {
            case WallEnum.Front:
                return createPosition({x: x + UNIT / 2, y: UNIT, z: y - WALL_DEPTH / 2});
            case WallEnum.Back:
                return createPosition({x: x + UNIT / 2, y: UNIT, z: y - UNIT + WALL_DEPTH / 2});
            case WallEnum.Left:
                return createPosition({x: x + WALL_DEPTH / 2, y: UNIT, z: y - UNIT / 2});
            default:
                return createPosition({x: x + UNIT, y: UNIT, z: y - UNIT / 2});
        }
    }
    /**
     * Positon of wall with window
     */
    getPositionHalfWall(direction: WallEnum) {
        const {x, y} = this.props.blockPosition
        switch (direction) {
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

    renderWallType() {
        const {x, y} = this.props.blockPosition,
            {direction, type} = this.props,
            geometry = this.getGeometry(direction),
            position = this.getPosition(direction),
            geometryHalf = this.getGeometryHalfWall(direction),
            positionHalp = this.getPositionHalfWall(direction)
        if (type === WallType.plain) {
            return (
                <Entity id={`Wall ${type}`}
                    geometry={geometry}
                    position={position}
                    rotation="0 0 0"
                    material={`src: url(${texture})`}
                />
            );
        } else if (type === WallType.door) {
            return (
                <Entity id="Wall">
                    <Entity id={`Wall ${type}`}
                        geometry={geometry}
                        position={position}
                        rotation="0 0 0"
                        material={`src: url(${texture})`}
                    />
                    {direction === WallEnum.Front && <a-entity position={createPosition({x: x + UNIT / 2, y: 0, z: y - 0.07})} scale="0.9 0.9 0.9" collada-model={`url(${door})`}></a-entity>}
                    {direction === WallEnum.Back && <a-entity position={createPosition({x: x + UNIT / 2, y: 0, z: y - UNIT + 0.07})} rotation="0 180 0" scale="0.9 0.9 0.9" collada-model={`url(${door})`}></a-entity>}
                    {direction === WallEnum.Right && <a-entity position={createPosition({x: x + UNIT - 0.07, y: 0, z: (y - UNIT / 2)})} rotation="0 90 0" scale="0.9 0.9 0.9" collada-model={`url(${door})`}></a-entity>}
                    {direction === WallEnum.Left && <a-entity position={createPosition({x: x + 0.07, y: 0, z: (y - UNIT / 2)})} rotation="0 270 0" scale="0.9 0.9 0.9" collada-model={`url(${door})`}></a-entity>}
                </Entity>
            );
        } else {
            return (
                <Entity id="Window">
                    <Entity id="FrontWall"
                        geometry={geometryHalf}
                        position={positionHalp}
                        rotation="0 0 0"
                        material={`src: url(${texture})`}
                    />
                    {direction === WallEnum.Front &&  <a-entity position={createPosition({x: x + UNIT / 2, y: UNIT, z: y})} scale="0.46 0.4 0.8" collada-model={`url(${window})`}></a-entity>}
                    {direction === WallEnum.Back && <a-entity position={createPosition({x: x + UNIT / 2, y: UNIT, z: y - UNIT})} rotation="0 180 0" scale="0.46 0.4 0.8" collada-model={`url(${window})`}></a-entity>}
                    {direction === WallEnum.Right && <a-entity position={createPosition({x: x + UNIT, y: UNIT, z: (y - UNIT / 2)})} rotation="0 90 0" scale="0.46 0.4 0.8" collada-model={`url(${window})`}></a-entity>}
                    {direction === WallEnum.Left && <a-entity position={createPosition({x: x, y: UNIT, z: (y - UNIT / 2)})} rotation="0 270 0" scale="0.46 0.4 0.8" collada-model={`url(${window})`}></a-entity>}
                </Entity>
            )
        }
    }

    render() {
        const {x, y} = this.props.blockPosition,
            {direction, type} = this.props,
            geometry = this.getGeometry(direction),
            position = this.getPosition(direction),
            geometryHalf = this.getGeometryHalfWall(direction),
            positionHalp = this.getPositionHalfWall(direction);
        return (
            <Entity id="Walla">{this.renderWallType()}</Entity>
        );
    }
}

export default Wall;
