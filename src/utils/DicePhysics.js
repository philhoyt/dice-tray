import Matter from 'matter-js';

const DicePhysics = (dice) => {
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 0;

    const width = 800;
    const height = 600;

    const render = Matter.Render.create({
        element: document.getElementById('physics-canvas'),
        engine: engine,
        options: {
            width: width,
            height: height,
            wireframes: false,
            background: 'black'
        }
    });

    const diceBodies = dice.map((die) => {
        const sides = parseInt(die.die.substring(1), 10); // Use this variable if needed
        const size = 40; 
        const x = Math.random() * (width - size) + size / 2;
        const y = Math.random() * (height - size) + size / 2;

        let body;
        switch (sides) {
            case 2:
            case 100:
                body = Matter.Bodies.circle(x, y, size / 2, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
            case 4:
                body = Matter.Bodies.polygon(x, y, 3, size / 2, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
            case 6:
                body = Matter.Bodies.rectangle(x, y, size, size, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
            case 8:
                body = Matter.Bodies.polygon(x, y, 6, size / 2, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
            case 10:
                body = Matter.Bodies.polygon(x, y, 5, size / 2, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
            case 12:
                body = Matter.Bodies.polygon(x, y, 10, size / 2, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
            case 20:
                body = Matter.Bodies.polygon(x, y, 6, size / 2, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
            default:
                body = Matter.Bodies.rectangle(x, y, size, size, { 
                    restitution: 0.9,
                    friction: 0.1,
                    frictionAir: 0.02 
                });
                break;
        }

        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
        
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

    Matter.Engine.run(engine);
    Matter.Render.run(render);
};

export default DicePhysics;
