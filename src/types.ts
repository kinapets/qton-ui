export interface Position {
    x: number;
    y: number;
}
// difference between position and Aframe position is that y (Position) means z (AFramePosition)
export interface AframePosition {
    x: number;
    y: number;
    z: number;
}

export const UNIT = 1;
export const WALL_DEPTH = 0.0005;
