import React from 'react';

const DiceLoader = ({ dice, onRemoveDie }) => {
    return (
        <div>
            <h2>Dice Loader</h2>
            <ul>
                {dice.map((die, index) => (
                    <li key={index} onClick={() => onRemoveDie(index)}>{die}</li>
                ))}
            </ul>
        </div>
    );
};

export default DiceLoader;
