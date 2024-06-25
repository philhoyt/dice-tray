// DicePhysics.js
import Matter from 'matter-js';

const createDicePhysics = (dice) => {
    const engine = Matter.Engine.create();
    const world = engine.world;

    const width = 800;
    const height = 600;

    const render = Matter.Render.create({
        element: document.getElementById('dice-canvas'),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: 'black'
        }
    });

    // Create ground and walls
    const ground = Matter.Bodies.rectangle(width / 2, height - 25, width, 50, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(25, height / 2, 50, height, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width - 25, height / 2, 50, height, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2, 25, width, 50, { isStatic: true });

    Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);

    // Create dice bodies
    const diceBodies = dice.map((die) => {
        const sides = parseInt(die.substring(1), 10);
        const size = 40; // Adjust the size as needed
        const x = Math.random() * (width - size) + size / 2;
        const y = Math.random() * (height - size) / 2;

        const body = Matter.Bodies.rectangle(x, y, size, size, { restitution: 0.5 });
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

        return body;
    });

    Matter.World.add(world, diceBodies);

    // Run the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    return diceBodies;
};

export default createDicePhysics;
