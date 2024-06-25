import Matter from 'matter-js';
import { getRender } from './initEngine';

const renderDice = (diceBodies) => {
    const render = getRender();

    // Ensure render and render.events are defined
    if (render && render.events) {
        // Clear any existing event listener for 'afterRender'
        Matter.Events.off(render, 'afterRender');
    }

    // Render the result on each die
    Matter.Events.on(render, 'afterRender', () => {
        const context = render.context;

        // Clear the rendering context
        context.clearRect(0, 0, render.canvas.width, render.canvas.height);

        // Draw each die
        diceBodies.forEach((body) => {
            // Draw the shape of the die
            const vertices = body.vertices;
            context.beginPath();
            context.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j++) {
                context.lineTo(vertices[j].x, vertices[j].y);
            }
            context.closePath();
            context.fillStyle = '#000000'; // Black fill
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#FFFFFF'; // White border
            context.stroke();

            // Draw the result text on top of the shape
            const result = body.diceResult;
            if (result) {
                const { position, angle } = body;
                context.save();
                context.translate(position.x, position.y);
                context.rotate(angle);
                context.font = 'normal normal 20px/20px Tiny5';
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
