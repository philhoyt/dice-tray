import Matter from 'matter-js';
import { getEngine, getRender, addRenderEventListener } from './initEngine';

const addDiceToWorld = (diceBodies) => {
    const engine = getEngine();
    const render = getRender();

    Matter.World.add(engine.world, diceBodies);

    // Clear the previous event listener if it exists
    if (render.events && render.events.afterRender) {
        Matter.Events.off(render, 'afterRender');
    }
    
    // Render the shapes and results on each die
    addRenderEventListener(() => {
        const context = render.context;
        context.clearRect(0, 0, render.canvas.width, render.canvas.height); // Clear the rendering context
        
        // Draw the shapes
        diceBodies.forEach((body) => {
            const vertices = body.vertices;
            context.beginPath();
            context.moveTo(vertices[0].x, vertices[0].y);
            for (let j = 1; j < vertices.length; j++) {
                context.lineTo(vertices[j].x, vertices[j].y);
            }
            context.lineTo(vertices[0].x, vertices[0].y);
            context.closePath();
            context.fillStyle = '#000000'; // Black fill
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#FFFFFF'; // White border
            context.stroke();
        });

        // Draw the text on top of the shapes
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
                context.textBaseline = 'middle'; // Ensure vertical alignment
                context.fillText(result, 0, 0);
                context.restore();
            }
        });
    });
};

export default addDiceToWorld;
