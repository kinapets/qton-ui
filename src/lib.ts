import {AframePosition} from './types';


export function createPosition(position: AframePosition) {
    return `${position.x} ${position.y} ${position.z}`
}