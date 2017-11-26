import {WallType} from './Block/BlockTypes';

export enum PlaceType {
    nothing,
    wall,
    door,
    window,
    table,
    dinnerTable,
    sofa,
    tv,
    bed,
    wardrobe,
    coffeeTable,
    flower
}

export enum Direction {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
}

export interface RoomPixel {
    top: number;
    bottom: number;
    right: number;
    left: number;
    placeType: PlaceType;
}

export interface RoomDefinition {
    definition: PlaceType[][];
}

export interface Position {m: number; n: number;}


export enum EdgeTypes {
    nothing,
    wall,
    door,
    window
}

export interface PlaceDefinition {
    currentPlace: PlaceType | null;
    heatmapValue?: number;
    edges: {
        front: WallType | null;
        back: WallType | null;
        left: WallType | null;
        right: WallType | null;
    } | null,
    m: number;
    n: number;
}
