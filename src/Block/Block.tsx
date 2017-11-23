import 'aframe';
import 'aframe-particle-system-component';
import * as React from 'react';
import {Entity, Scene} from 'aframe-react';
import Wall from './Wall';
import {WallEnum} from './Wall';
import {Position, UNIT} from '../types';



interface BlockProps{
    position: Position
}

class Block extends React.Component<any, any> {
    props: BlockProps;


    handleClick = () => {
        console.log('Clicked!');
    }

    handleCollide = () => {
        console.log('Collided!');
    }

    render() {
        const {x, y} = this.props.position;
        return (
                <Entity>
                    <Wall blockPosition={{x, y}} type={WallEnum.Back}/>
                    {/* <Wall blockPosition={{x, y}} type={WallEnum.Front}/>
                    <Wall blockPosition={{x, y}} type={WallEnum.Right}/> */}

                    <a-entity
                        geometry={`primitive: plane; width: ${UNIT}; height: ${UNIT}`}
                        position={`${x + UNIT / 2 } 0 ${y - UNIT/2}`}
                        rotation="-90 0 0"
                        material="color: #7BC8A4"
                    />
                </Entity>
        );
    }
}

export default Block;
