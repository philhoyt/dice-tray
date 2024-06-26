import Matter from 'matter-js';
import { getRender } from './initEngine';
import { imageCache } from './createDice';

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

            // Check if the body has a sprite
            if (body.render.sprite && body.render.sprite.texture) {
                const texture = imageCache[body.render.sprite.texture];
                if (texture) {
                    const { position, angle } = body;
                    context.save();
                    context.translate(position.x, position.y);
                    context.rotate(angle);
                    context.drawImage(
                        texture,
                        -body.render.sprite.xScale * 20,
                        -body.render.sprite.yScale * 20,
                        body.render.sprite.xScale * 40,
                        body.render.sprite.yScale * 40
                    );
                    context.restore();
                } else {
                    console.error(`Texture not found in cache: ${body.render.sprite.texture}`);
                }
            }

            // Draw the result text on top of the shape
            const result = body.diceResult;
            if (result) {
                const { position, angle } = body;
                context.save();
                context.translate(position.x, position.y); // Adjusting the x position by 5 pixels
                context.rotate(angle);
                context.font = 'normal normal 20px/20px Tiny5';
                context.fillStyle = 'yellow'; // Text color
                context.textAlign = 'center';
                context.textBaseline = 'middle'; // Ensure vertical alignment
                context.fillText(result, 0, 0);
                context.restore();
            }
        });
    });
};

export default renderDice;
