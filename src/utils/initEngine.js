import Matter from 'matter-js';

let engine;
let render;
let runner;
let initialized = false;
let eventHandler;

const initEngine = () => {
    if (!initialized) {
        engine = Matter.Engine.create();
        engine.world.gravity.y = 0; // Set gravity to zero

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

        // Create ground and walls (borders)
        const borders = [
            Matter.Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }), // Top border
            Matter.Bodies.rectangle(width / 2, height, width, 50, { isStatic: true }), // Bottom border
            Matter.Bodies.rectangle(0, height / 2, 50, height, { isStatic: true }), // Left border
            Matter.Bodies.rectangle(width, height / 2, 50, height, { isStatic: true }) // Right border
        ];

        Matter.World.add(engine.world, borders);

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

        const borders = [
            Matter.Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }), // Top border
            Matter.Bodies.rectangle(width / 2, height, width, 50, { isStatic: true }), // Bottom border
            Matter.Bodies.rectangle(0, height / 2, 50, height, { isStatic: true }), // Left border
            Matter.Bodies.rectangle(width, height / 2, 50, height, { isStatic: true }) // Right border
        ];

        Matter.World.add(engine.world, borders);
    }
};

const addRenderEventListener = (callback) => {
    if (eventHandler) {
        Matter.Events.off(render, 'afterRender', eventHandler);
    }
    eventHandler = callback;
    Matter.Events.on(render, 'afterRender', eventHandler);
};

const getEngine = () => engine;
const getRender = () => render;
const getRenderOptions = () => render.options;

export { initEngine, getEngine, getRender, getRenderOptions, addRenderEventListener };
