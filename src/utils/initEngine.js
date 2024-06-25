import Matter from 'matter-js';

let engine;
let render;
let runner;
let initialized = false;

const initEngine = () => {
    if (!initialized) {
        engine = Matter.Engine.create();
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

        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);

        initialized = true;
    } else {
        // Clear existing dice bodies
        Matter.World.clear(engine.world, false);
        // Re-add ground and walls
        const width = render.options.width;
        const height = render.options.height;
        const ground = Matter.Bodies.rectangle(width / 2, height - 25, width, 50, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(25, height / 2, 50, height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width - 25, height / 2, 50, height, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, 25, width, 50, { isStatic: true });

        Matter.World.add(engine.world, [ground, leftWall, rightWall, ceiling]);
    }
};

const getEngine = () => engine;
const getRender = () => render;
const getRenderOptions = () => render.options;

export { initEngine, getEngine, getRender, getRenderOptions };
