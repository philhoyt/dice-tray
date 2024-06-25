import React, { useEffect } from 'react';
import setupPhysicsEngine from '../utils/PhysicsEngine';

const DiceTray = ({ results }) => {
    useEffect(() => {
        if (results.length > 0) {
            const diceData = results.map(result => ({ die: result.die, result: result.result }));
            setupPhysicsEngine(diceData);
        }
    }, [results]);

    return (
        <div>
            <h2>Dice Tray</h2>
            <div id="physics-canvas" style={{ margin: '0 auto', marginTop: '50px', height: '600px', width: '800px' }}></div>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.die}: {result.result}</li>
                ))}
            </ul>
        </div>
    );
};

export default DiceTray;
