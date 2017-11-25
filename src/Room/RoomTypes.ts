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
    wardrobe
}

export interface RoomDefinition {
    definition: PlaceType[][];
}

interface PlaceDefinition {
    currentPlace: PlaceType;
    edges: {
        front: EdgeTypes;
        back: EdgeTypes;
        left: EdgeTypes;
        right: EdgeTypes;
    }
    m: number;
    n: number;

}

const roomExample: RoomDefinition = {
    definition: [
        [1, 1, 1, 1, 1, 1, 1, 1, 2, 1 ],
        [3, 0, 0, 0, 0, 2, 0, 0, 0, 1 ],
        [3, 0, 0, 0, 0, 1, 0, 0, 0, 1 ],
        [1, 0, 0, 0, 0, 3, 0, 0, 0, 3 ],
        [1, 0, 0, 0, 0, 3, 0, 0, 0, 1 ],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 3 ],
        [1, 1, 2, 1, 1, 1, 1, 1, 3, 1 ],
    ]
}




