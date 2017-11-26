import {RoomDefinition, PlaceType, PlaceDefinition} from '../common';
import {WallType} from '../Block/BlockTypes';
import * as _ from 'lodash';

function placeTypeToWallType(placeType: PlaceType): any {
    if (placeType == PlaceType.wall) {
        return WallType.plain;
    } else if (placeType == PlaceType.window){
        return WallType.window;
    } else if (placeType == PlaceType.door) {
        return WallType.door;
    } else {
        return null;
    }
}

export function transformForRender(room: RoomDefinition, heatmap?: number[][]): PlaceDefinition[] {
    const def = room.definition;
    const places: PlaceDefinition[] = [];


    const c = def.map((placeTypes, nn) => {
        let m = 0;
        return placeTypes.map((placeType, mm) => {
            if (placeType <= PlaceType.window && placeType != PlaceType.nothing) {
                // places.push({currentPlace: null, edges: null, m: mm, n: nn});
                return {currentPlace: null, edges: null, m: mm, n: nn}
            } else {
                let edges = {back: null, front: null, right: null, left: null};
                const back = _.get(def, `[${nn + 1}][${mm}]`, 1000),
                 front = _.get(def, `[${nn - 1}][${mm}]`, 1000),
                 right = _.get(def, `[${nn}][${mm + 1}]`, 1000),
                 left = _.get(def, `[${nn}][${mm - 1}]`, 1000);

                if (back <= PlaceType.window && back !== PlaceType.nothing) {
                    edges.front = placeTypeToWallType(back);
                }

                if (front <= PlaceType.window && front !== PlaceType.nothing) {
                    edges.back = placeTypeToWallType(front);
                }
                if (right <= PlaceType.window && right !== PlaceType.nothing) {
                    edges.right = placeTypeToWallType(right);
                }

                if (left <= PlaceType.window && left !== PlaceType.nothing) {
                    edges.left = placeTypeToWallType(left);
                }
                places.push({
                    currentPlace: placeType,
                    edges,
                    m: m,
                    n: nn,
                    heatmapValue: _.get(heatmap, `[${nn}][${mm}]`)
                });
                m++;
                return {
                    currentPlace: placeType,
                    edges,
                    m: m,
                    n: nn,
                };
            }
        })

    })
    return places;
}