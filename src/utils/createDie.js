import Matter from 'matter-js';

const createDie = (die, renderOptions) => {
    const sides = parseInt(die.die.substring(1), 10);
    const size = 40; // Adjust the size as needed
    const x = Math.random() * (renderOptions.width - size) + size / 2;
    const y = Math.random() * (renderOptions.height - size) + size / 2;

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
};

export default createDie;
