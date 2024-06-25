// RollHistory.js
import React from 'react';

const RollHistory = ({ history, onClearHistory }) => {
    return (
        <div>
            <h2>Roll History</h2>
            <button onClick={onClearHistory}>Clear History</button>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                        <p><strong>Loaded Dice:</strong> {entry.dice.join(', ')}</p>
                        <p><strong>Results:</strong></p>
                        <ul>
                            {entry.results.map((result, idx) => (
                                <li key={idx}>{result.die}: {result.result}</li>
                            ))}
                        </ul>
                        <p><strong>Total:</strong> {entry.total}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RollHistory;
