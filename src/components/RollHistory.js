import React from 'react';

const RollHistory = ({ history, onClearHistory }) => {
    return (
        <div>
            <h2>Roll History</h2>
            <button onClick={onClearHistory}>Clear History</button>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        <div>{new Date(entry.timestamp).toLocaleString()}</div>
                        <div>
                            {entry.dice.map((die, i) => (
                                <span key={i}>{die} </span>
                            ))}
                        </div>
                        <div>Results: {entry.results.map((res) => res.result).join(', ')}</div>
                        <div>Total: {entry.total}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RollHistory;
