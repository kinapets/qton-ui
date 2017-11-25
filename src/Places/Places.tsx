import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import {createPosition} from './../lib';
import {WallEnum as Direction} from '../Block/BlockTypes';
import {roomExample, PlaceType} from '../Room/RoomTypes';

import {Position, UNIT} from '../types';
import * as _ from 'lodash';

interface Place {position: Position, type: PlaceType, direction: Direction}

interface PlacesProps {
    places: Place[], queue: {[key:string]: PlaceType}
}


class Places extends React.Component<any, any> {
    props: any;


    renderTv(position: Position, direction: Direction) {
        let rotation = 0;
        let {x, y} = position;

        if (direction === Direction.Back) {
            rotation = 270;
        } else if (direction === Direction.Front) {
            rotation = 90;
        } else if (direction === Direction.Right) {
            rotation = 0;
            y = y -1;
        } else if (direction === Direction.Left) {
            rotation = 180;
        }
        return (
            <a-entity
                id={`television:${position.x}:${position.y}`}
                key={`television:${position.x}:${position.y}`}
                position={createPosition({x: x, y: 0, z: y})}
                rotation={`0 ${rotation} 0`}
                scale="0.4 0.4 0.4"
                collada-model={`url(tv2/model.dae)`}
            />
        );
    }

    renderSofa(position: Position, direction: Direction) {
        let rotation = 0;
        let {x, y} = position;

        if (direction === Direction.Back) {
            rotation = 270;
        } else if (direction === Direction.Front) {
            rotation = 90;
        } else if (direction === Direction.Right) {
            rotation = 0;
            y = y + 0.5;
        } else if (direction === Direction.Left) {
            rotation = 180;
        }
        return (
            <a-entity
                id={`sofa:${position.x}:${position.y}`}
                key={`sofa:${position.x}:${position.y}`}
                position={createPosition({x: x, y: 0, z: y})}
                rotation={`0 ${rotation} 0`}
                scale="0.04 0.04 0.04"
                collada-model={`url(sofa.dae)`}
            />
        );
    }

    renderCoffeeTable(position: Position, direction: Direction) {
        let rotation = 0;
        let {x, y} = position;

        if (direction === Direction.Back) {
            rotation = 270;
        } else if (direction === Direction.Front) {
            rotation = 90;
        } else if (direction === Direction.Right) {
            rotation = 0;
            y = y + 0.5;
        } else if (direction === Direction.Left) {
            rotation = 180;
        }
        return (
            <a-entity
                id={`coffeeTable:${position.x}:${position.y}`}
                key={`coffeeTable:${position.x}:${position.y}`}
                position={createPosition({x: x, y: 0, z: y})}
                rotation={`0 ${rotation} 0`}
                scale="1 1 1"
                collada-model={`url(coffee-table/model.dae)`}
            />
        );
    }

    renderTable(position: Position, direction: Direction) {
        let rotation = 0;
        let {x, y} = position;

        if (direction === Direction.Back) {
            rotation = 270;
        } else if (direction === Direction.Front) {
            rotation = 90;
        } else if (direction === Direction.Right) {
            rotation = 0;
            y = y + 0.5;
        } else if (direction === Direction.Left) {
            rotation = 180;
        }
        return (
            <a-entity
                id={`table:${position.x}:${position.y}`}
                key={`table:${position.x}:${position.y}`}
                position={createPosition({x: x, y: 0, z: y})}
                rotation={`0 ${rotation} 0`}
                scale="0.8 0.8 0.8"
                collada-model={`url(table/model.dae)`}
            />
        );
    }

    renderWardrobe(position: Position, direction: Direction) {
        let rotation = 0;
        let {x, y} = position;

        if (direction === Direction.Back) {
            rotation = 270;
        } else if (direction === Direction.Front) {
            rotation = 90;
        } else if (direction === Direction.Right) {
            rotation = 0;
            y = y + 1;
        } else if (direction === Direction.Left) {
            rotation = 180;
        }
        return (
            <a-entity
                id={`wardrobe:${position.x}:${position.y}`}
                key={`wardrobe:${position.x}:${position.y}`}
                position={createPosition({x: x, y: 0, z: y})}
                rotation={`0 ${rotation} 0`}
                scale="0.8 0.8 0.8"
                collada-model={`url(cabinet/model.dae)`}
            />
        );
    }

    renderFlower(position: Position, direction: Direction) {
        let rotation = 0;
        let {x, y} = position;

        if (direction === Direction.Back) {
            rotation = 270;
        } else if (direction === Direction.Front) {
            rotation = 90;
        } else if (direction === Direction.Right) {
            rotation = 0;
            y = y + 1;
        } else if (direction === Direction.Left) {
            rotation = 180;
        }
        return (
            <a-entity
                id={`flower:${position.x}:${position.y}`}
                key={`flower:${position.x}:${position.y}`}
                position={createPosition({x: x, y: -0.43, z: y})}
                rotation={`0 ${rotation} 0`}
                scale="0.8 0.8 0.8"
                collada-model={`url(flower/model.dae)`}
            />
        );
    }

    render() {
        return (
            <Entity>
                {this.props.places.map(((place: Place) => {
                    const {x,y } = place.position;
                    console.log("current place type ", place.type);
                    if (place.type === PlaceType.tv) {
                        return this.renderTv({x, y}, place.direction);
                    }else if (place.type === PlaceType.sofa) {
                        return this.renderSofa({x, y}, place.direction);
                    } else if (place.type === PlaceType.coffeeTable) {
                        return this.renderCoffeeTable({x, y}, place.direction);
                    } else if (place.type === PlaceType.table) {
                        return this.renderTable({x, y}, place.direction);
                    } else if (place.type === PlaceType.wardrobe) {
                        return this.renderWardrobe({x, y}, place.direction);
                    } else if (place.type === PlaceType.flower) {
                        return this.renderFlower({x, y}, place.direction);
                    }
                     else {
                        return (<Entity/>);
                    }
                }))}
            </Entity>
        );
    }
}

export default Places;
