import React from 'react';

const RollHistory = ({ history, onClearHistory }) => {
    const formatDice = (dice) => {
        const diceCounts = dice.reduce((acc, die) => {
            acc[die] = (acc[die] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(diceCounts).map(([die, count]) => `${count} x ${die}`).join(', ');
    };

    return (
        <div>
            <h2>Roll History</h2>
            <ul>
                {history.slice().reverse().map((entry, index) => (
                    <li key={index}>
                        <p>
                            <strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}
                        </p>
                        <p>
                            <strong>Dice:</strong> {formatDice(entry.dice)}
                        </p>
                        <p>
                            <strong>Results:</strong> {entry.results.map(result => `${result.die}: ${result.result}`).join(', ')}
                        </p>
                        <p>
                            <strong>Modifier:</strong> {entry.modifier >= 0 ? `+ ${entry.modifier}` : `- ${Math.abs(entry.modifier)}`}
                        </p>
                        <p>
                            <strong>Total:</strong> {entry.total}
                        </p>
                    </li>
                ))}
            </ul>
            <button onClick={onClearHistory}>Clear History</button>
        </div>
    );
};

export default RollHistory;
