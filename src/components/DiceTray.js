import React from 'react';

const DiceTray = ({ results }) => {
    return (
        <div>
            <h2>Dice Tray</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.die}: {result.result}</li>
                ))}
            </ul>
        </div>
    );
};

export default DiceTray;
