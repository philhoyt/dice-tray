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
                background: 'black'
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
        const sides = parseInt(die.die.substring(1), 10);
        const size = 40; // Adjust the size as needed
        const x = Math.random() * (render.options.width - size) + size / 2;
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

    // Render the result on each die
    Matter.Events.on(render, 'afterRender', () => {
        const context = render.context;
        diceBodies.forEach((body) => {
            const result = body.diceResult;
            if (result) {
                const { position, angle } = body;
                context.save();
                context.translate(position.x, position.y);
                context.rotate(angle);
                context.fillStyle = 'white';
                context.font = '20px Tiny5';
                context.textAlign = 'center';
                context.fillText(result, 0, 0);
                context.restore();
            }
        });
    });

    return diceBodies;
};

export default setupPhysicsEngine;
