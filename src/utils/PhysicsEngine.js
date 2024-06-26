import { initEngine } from './initEngine';
import createDice from './createDice';
import renderDice from './renderDice';

const setupPhysicsEngine = async (dice = []) => {
    initEngine();

    // Create dice bodies
    const diceBodies = await createDice(dice);

    // Render the dice results
    renderDice(diceBodies);

    return diceBodies;
};

export default setupPhysicsEngine;
