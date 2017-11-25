import {Position, UNIT} from '../types';

export enum WallEnum {
    Left,
    Right,
    Front,
    Back,
}

export enum WallType {
    plain,
    window,
    door
}

export interface WallProps {
    direction: WallEnum;
    blockPosition: Position;
    type: WallType;
}

export interface BlockProps {
    position: Position;
    left?: WallType;
    right?: WallType;
    front?: WallType;
    back?: WallType;
    handleClick: Function;
}