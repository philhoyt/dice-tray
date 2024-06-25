import Matter from 'matter-js';
import { getEngine, getRenderOptions } from './initEngine';
import createBorders from './createBorders';
import createDie from './createDie';
import addDiceToWorld from './addDiceToWorld';

const createDice = (dice) => {
    const engine = getEngine();
    const renderOptions = getRenderOptions();

    // Clear previous dice bodies
    Matter.World.clear(engine.world, false);

    // Re-add borders (ground and walls)
    const borders = createBorders();
    Matter.World.add(engine.world, borders);

    // Create dice bodies
    const diceBodies = dice.map((die) => createDie(die, renderOptions));

    // Add dice bodies to the world
    addDiceToWorld(diceBodies);

    return diceBodies;
};

export default createDice;
