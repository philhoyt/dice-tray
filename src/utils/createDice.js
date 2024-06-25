import Matter from 'matter-js';
import { getEngine, getRenderOptions } from './initEngine';

const createDice = (dice) => {
    const engine = getEngine();
    const renderOptions = getRenderOptions();

    // Clear previous dice bodies
    Matter.World.clear(engine.world, false);

    // Re-add borders (ground and walls)
    const borders = [
        Matter.Bodies.rectangle(renderOptions.width / 2, 0, renderOptions.width, 50, { isStatic: true }), // Top border
        Matter.Bodies.rectangle(renderOptions.width / 2, renderOptions.height, renderOptions.width, 50, { isStatic: true }), // Bottom border
        Matter.Bodies.rectangle(0, renderOptions.height / 2, 50, renderOptions.height, { isStatic: true }), // Left border
        Matter.Bodies.rectangle(renderOptions.width, renderOptions.height / 2, 50, renderOptions.height, { isStatic: true }) // Right border
    ];

    Matter.World.add(engine.world, borders);

    console.log('Creating dice with the following data:', dice);

    // Create dice bodies
    const diceBodies = dice.map((die) => {
        const sides = parseInt(die.die.substring(1), 10);
        let size = 40; // Default size for dice
        if (sides === 4) {
            size = 60; // Increase size for d4 dice
        }
        const x = Math.random() * (renderOptions.width - size) + size / 2;
        const y = Math.random() * (renderOptions.height - size) + size / 2;

        let body;
        switch (sides) {
            case 2:
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
                body = Matter.Bodies.rectangle(x, y, 71, 80, { restitution: 0.5 });
                body.render.sprite = {
                    texture: '/svgs/d20.svg',
                    xScale: 71 / 40,
                    yScale: 80 / 40,
                };
                break;
            case 100:
                body = Matter.Bodies.circle(x, y, size / 2, { restitution: 0.5 });
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
