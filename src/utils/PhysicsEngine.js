// PhysicsEngine.js
import { initEngine, getRender } from './initEngine';
import createDice from './createDice';
import renderDice from './renderDice';

const setupPhysicsEngine = (dice = []) => {
    initEngine();

    // Create dice bodies
    const diceBodies = createDice(dice);

    // Render the dice results
    renderDice(diceBodies);

    return diceBodies;
};

export default setupPhysicsEngine;
