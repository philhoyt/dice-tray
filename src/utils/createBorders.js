import Matter from 'matter-js';
import { getRenderOptions } from './initEngine';

const createBorders = () => {
    const renderOptions = getRenderOptions();
    const width = renderOptions.width;
    const height = renderOptions.height;

    const borders = [
        Matter.Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }), // Top border
        Matter.Bodies.rectangle(width / 2, height, width, 50, { isStatic: true }), // Bottom border
        Matter.Bodies.rectangle(0, height / 2, 50, height, { isStatic: true }), // Left border
        Matter.Bodies.rectangle(width, height / 2, 50, height, { isStatic: true }) // Right border
    ];

    return borders;
};

export default createBorders;
