import Matter from 'matter-js';

const renderDice = (diceBodies) => {
    const { getRender } = require('./initEngine');
    const render = getRender();

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
                // Ensure the text is rendered as intended
                context.font = '20px Tiny5';
                context.fillStyle = 'white'; // Text color
                context.textAlign = 'center';
                context.textBaseline = 'middle'; // Ensure vertical alignment
                context.fillText(result, 0, 0);
                context.restore();
            }
        });
    });
};

export default renderDice;
