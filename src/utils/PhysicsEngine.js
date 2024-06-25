import Matter from 'matter-js';

let engine;
let render;
let runner;
let initialized = false;

const setupPhysicsEngine = (dice = []) => {
    if (!initialized) {
        engine = Matter.Engine.create();
        const world = engine.world;

        const width = 800;
        const height = 600;

        render = Matter.Render.create({
            element: document.getElementById('physics-canvas'),
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: 'black',
                showVelocity: true
            }
        });

        // Create ground and walls
        const ground = Matter.Bodies.rectangle(width / 2, height - 25, width, 50, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(25, height / 2, 50, height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width - 25, height / 2, 50, height, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, 25, width, 50, { isStatic: true });

        Matter.World.add(world, [ground, leftWall, rightWall, ceiling]);

        runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);

        initialized = true;
    } else {
        // Clear existing dice bodies
        Matter.World.clear(engine.world, false);
        // Re-add ground and walls
        const ground = Matter.Bodies.rectangle(render.options.width / 2, render.options.height - 25, render.options.width, 50, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(25, render.options.height / 2, 50, render.options.height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(render.options.width - 25, render.options.height / 2, 50, render.options.height, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(render.options.width / 2, 25, render.options.width, 50, { isStatic: true });

        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);
    }

    // Create dice bodies
    const diceBodies = dice.map((die) => {
        const sides = parseInt(die.substring(1), 10);
        const size = 40; // Adjust the size as needed
        const x = Math.random() * (render.options.width - size) + size / 2;
        const y = 50; // Start near the top of the canvas

        const body = Matter.Bodies.rectangle(x, y, size, size, { restitution: 0.5 });
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

        return body;
    });

    Matter.World.add(engine.world, diceBodies);

    return diceBodies;
};

export default setupPhysicsEngine;
