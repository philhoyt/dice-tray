import Matter from 'matter-js';
import { getEngine, getRenderOptions } from './initEngine';

const createDice = (dice) => {
    const engine = getEngine();
    const renderOptions = getRenderOptions();

    // Create dice bodies
    const diceBodies = dice.map((die) => {
        const sides = parseInt(die.die.substring(1), 10);
        const size = 40; // Adjust the size as needed
        const x = Math.random() * (renderOptions.width - size) + size / 2;
        const y = 50; // Start near the top of the canvas

        let body;
        switch (sides) {
            case 2:
            case 100:
                body = Matter.Bodies.circle(x, y, size / 2, { restitution: 0.5 });
                break;
            case 4:
                body = Matter.Bodies.polygon(x, y, 3, size / 2, { restitution: 0.5 });
                break;
            case 6:
                body = Matter.Bodies.rectangle(x, y, size, size, { restitution: 0.5 });
                break;
            case 8:
                body = Matter.Bodies.polygon(x, y, 6, size / 2, { restitution: 0.5 });
                break;
            case 10:
                body = Matter.Bodies.polygon(x, y, 5, size / 2, { restitution: 0.5 });
                break;
            case 12:
                body = Matter.Bodies.polygon(x, y, 10, size / 2, { restitution: 0.5 });
                break;
            case 20:
                body = Matter.Bodies.polygon(x, y, 6, size / 2, { restitution: 0.5 });
                break;
            default:
                body = Matter.Bodies.rectangle(x, y, size, size, { restitution: 0.5 });
                break;
        }

        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
        
        // Attach the result to the body
        body.diceResult = die.result;

        return body;
    });

    Matter.World.add(engine.world, diceBodies);

    return diceBodies;
};

export default createDice;
