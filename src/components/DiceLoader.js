import React from 'react';

const DiceLoader = ({ dice, onRemoveDie, onClearDice, onModifierChange }) => {
    // Count the occurrences of each die type
    const diceCounts = dice.reduce((acc, die) => {
        acc[die] = (acc[die] || 0) + 1;
        return acc;
    }, {});

    // Convert the counts into an array of strings like "3 x D6"
    const diceList = Object.entries(diceCounts).map(([die, count]) => `${count} x ${die}`);

    const handleModifierChange = (e) => {
        onModifierChange(Number(e.target.value));
    };

    const handleModifierReset = () => {
        onModifierChange(0);
        document.getElementById('modifier').value = 0;
    };

    return (
        <div>
            <h2>Dice Loader</h2>
            <ul>
                {diceList.map((die, index) => (
                    <li key={index}>
                        {die} <button onClick={() => onRemoveDie(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={onClearDice}>Clear Dice</button>
            <div className="modifier-container">
                <label htmlFor="modifier">Modifier:</label>
                <input
                    type="number"
                    id="modifier"
                    name="modifier"
                    defaultValue={0}
                    onChange={handleModifierChange}
                    className="modifier-input"
                />
                <button onClick={handleModifierReset} className="modifier-reset">Reset</button>
            </div>
        </div>
    );
};

export default DiceLoader;
