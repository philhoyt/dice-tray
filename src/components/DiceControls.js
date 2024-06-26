import React from 'react';

const DiceControls = ({ onAddDie }) => {
    const diceTypes = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];

    return (
        <div>
            <h2>Dice Controls</h2>
            {diceTypes.map((type) => (
                <button key={type} onClick={() => onAddDie(type)}>{type}</button>
            ))}
        </div>
    );
};

export default DiceControls;
