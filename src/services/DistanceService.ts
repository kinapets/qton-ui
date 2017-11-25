import * as _ from 'lodash';

export enum PlaceType {
    NOTHING,
    WALL,
    DOOR,
    WINDOW,
    TABLE,
    DINNERTABLE,
    SOFA,
    TV,
    BED,
    WARDROBE
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

class DistanceService {
    private roomDefinition: RoomDefinition;

    constructor() {}

    // position - starting point for which we want a result
    // direction
    // searchedType - Type of object which we search for
    getDistance(position: Position, direction: Direction, searchedType?: PlaceType) {
        const directionVector = this.getDirectionVector(direction);
        const {m, n} = position;
        let tempPosition = position;
        let distance = 0;

        while (!this.findType(tempPosition, searchedType)) {
            distance++;
            const {m, n} = tempPosition;
            tempPosition = {m: m + directionVector.m, n: n + directionVector.n}
        }
        return distance;
    }

    /**
     * Is edge of room - ending with wall, window or door
     * @param position {Position}
     */
    findType(position: Position, searchedType?: PlaceType): boolean {
        const mMax = this.roomDefinition.definition.length - 1,
            nMax = this.roomDefinition.definition[0].length - 1,
            {m, n} = position,
            isZero = Boolean(m <= 0 || n <= 0),
            isMoreThanMatrixSize = Boolean(m >= mMax || n >= nMax),
            isOnEdgeOfMatrix = Boolean((isZero || isMoreThanMatrixSize)),
            placeType = _.get(this.roomDefinition.definition, `[${m}][${n}]`, -1);
            // either is searchedType defined and if so, it has to match
            // OR it's undefined and then it's a wall and we count distance for windows and doors as well
        const typeMatch = _.isUndefined(searchedType) ? placeType < PlaceType.WINDOW : placeType === searchedType;
        return (isOnEdgeOfMatrix || (typeMatch && placeType !== PlaceType.NOTHING));
    }

    private getDirectionVector(direction: Direction): Position {
        switch (direction) {
            case Direction.BOTTOM:
                return {m: 0, n: 1}
            case Direction.TOP:
                return {m: 0, n: -1}
            case Direction.LEFT:
                return {m: -1, n: 0}
            case Direction.RIGHT:
                return {m: 1, n: 0}
            default:
                throw("Unknown vector");
        }
    }

    getDistances(roomDefinition: RoomDefinition, type: PlaceType) {
        this.roomDefinition = roomDefinition;

        const dataSet = roomDefinition.definition.map((array, m) => {
            return array.map((item: PlaceType, n) => {
                return {
                    distance_top_wall: this.getDistance({m: m, n: n}, Direction.TOP),
                    distance_right_wall: this.getDistance({m: m, n: n}, Direction.RIGHT),
                    distance_bottom_wall: this.getDistance({m: m, n: n}, Direction.BOTTOM),
                    distance_left_wall: this.getDistance({m: m, n: n}, Direction.LEFT),

                    distance_top_window: this.getDistance({m: m, n: n}, Direction.TOP, PlaceType.WINDOW),
                    distance_right_window: this.getDistance({m: m, n: n}, Direction.RIGHT, PlaceType.WINDOW),
                    distance_bottom_window: this.getDistance({m: m, n: n}, Direction.BOTTOM, PlaceType.WINDOW),
                    distance_left_window: this.getDistance({m: m, n: n}, Direction.LEFT, PlaceType.WINDOW),

                    distance_top_door: this.getDistance({m: m, n: n}, Direction.TOP, PlaceType.DOOR),
                    distance_right_door: this.getDistance({m: m, n: n}, Direction.RIGHT, PlaceType.DOOR),
                    distance_bottom_door: this.getDistance({m: m, n: n}, Direction.BOTTOM, PlaceType.DOOR),
                    distance_left_door: this.getDistance({m: m, n: n}, Direction.LEFT, PlaceType.DOOR),
            }
            });
        });
        return _.flatten(dataSet)
    }
}

export default new DistanceService();