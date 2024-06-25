import React from 'react';

const DiceTray = ({ results, onRemoveResult }) => {
    return (
        <div>
            <h2>Dice Tray</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index} onClick={() => onRemoveResult(index)}>{result.die}: {result.result}</li>
                ))}
            </ul>
        </div>
    );
};

export default DiceTray;
