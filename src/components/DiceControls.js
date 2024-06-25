import React from 'react';

const DiceControls = ({ onAddDie, onClearDice }) => {
    const diceTypes = ['d2', 'd3', 'd4', 'd6', 'd8', 'd10', 'd12', 'd14', 'd16', 'd20', 'd24', 'd30', 'd100'];

    return (
        <div>
            <h2>Dice Selection Toolbox</h2>
            {diceTypes.map((type) => (
                <button key={type} onClick={() => onAddDie(type)}>{type}</button>
            ))}
            <button onClick={onClearDice}>Clear Dice Loader</button>
        </div>
    );
};

export default DiceControls;
