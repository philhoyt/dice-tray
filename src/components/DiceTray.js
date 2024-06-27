import React, { useEffect } from 'react';
import setupPhysicsEngine from '../utils/PhysicsEngine';

const DiceTray = ({ results }) => {
    useEffect(() => {
        const initializeEngine = async () => {
            try {
                if (results.length > 0) {
                    const diceData = results.map(result => ({ die: result.die, result: result.result }));
                    await setupPhysicsEngine(diceData);
                } else {
                    await setupPhysicsEngine([]);
                }
    
                const handleResize = () => {
                    const container = document.getElementById('physics-canvas-container');
                    const canvas = container.querySelector('canvas');
                    canvas.width = container.clientWidth;
                    canvas.height = container.clientHeight;
                };
    
                window.addEventListener('resize', handleResize);
    
                return () => {
                    window.removeEventListener('resize', handleResize);
                };
            } catch (error) {
                console.error('Failed to initialize the physics engine:', error);
                // Handle the error appropriately
            }
        };
    
        initializeEngine();
    }, [results]);

    return (
        <div id="physics-canvas-container"></div>
    );
};

export default DiceTray;
