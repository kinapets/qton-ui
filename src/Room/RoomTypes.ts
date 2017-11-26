import * as _ from 'lodash';
import {WallType} from '../Block/BlockTypes';

export enum EdgeTypes {
    nothing,
    wall,
    door,
    window
}

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

export interface RoomDefinition {
    definition: PlaceType[][];
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

export const roomExample: RoomDefinition = {
    definition: [
        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1 ],
        [3, 7, 0, 0, 0, 0, 0, 0, 7, 1 ],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 3 ],
        [1, 0, 0, 0, 7, 0, 0, 0, 0, 1 ],
        [1, 0, 0, 0, 7, 0, 0, 0, 0, 3 ],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
        [1, 7, 0, 0, 0, 0, 0, 0, 7, 1 ],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 1 ],
    ]
}

export const heatmapExample: number[][] = [
        [0.1, 0.2, 0., 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.7, 8 ],
        [0, 0, 0, 0, 0.8, 0.8, 0.8, 0, 0, 0 ],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
];