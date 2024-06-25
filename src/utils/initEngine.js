import Matter from 'matter-js';

let engine;
let render;
let runner;
let initialized = false;

const initEngine = () => {
    if (!initialized) {
        engine = Matter.Engine.create();
        engine.world.gravity.y = 0; // Set gravity to zero

        const container = document.getElementById('physics-canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        render = Matter.Render.create({
            element: container,
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

        window.addEventListener('resize', handleResize);

        initialized = true;
    } else {
        handleResize();
    }
};

const handleResize = () => {
    const container = document.getElementById('physics-canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    render.options.width = width;
    render.options.height = height;
    render.canvas.width = width;
    render.canvas.height = height;

    Matter.Engine.update(engine);

    const borders = [
        Matter.Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true }), // Top border
        Matter.Bodies.rectangle(width / 2, height, width, 50, { isStatic: true }), // Bottom border
        Matter.Bodies.rectangle(0, height / 2, 50, height, { isStatic: true }), // Left border
        Matter.Bodies.rectangle(width, height / 2, 50, height, { isStatic: true }) // Right border
    ];

    Matter.World.clear(engine.world, false);
    Matter.World.add(engine.world, borders);
};

const getEngine = () => engine;
const getRender = () => render;
const getRenderOptions = () => render.options;

export { initEngine, getEngine, getRender, getRenderOptions };
