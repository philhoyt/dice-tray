import React from 'react';

const Results = ({ results = [], total }) => {
    const diceTotal = results.reduce((acc, curr) => acc + curr.result, 0);
    const modifier = total - diceTotal;
    const modifierSign = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;

    return (
        <div>
            <h2>Results</h2>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        {result.die}: {result.result}
                    </li>
                ))}
            </ul>
            {modifier !== 0 ? (
                <p className="total">
                    <span className="dice-total">{diceTotal} </span> 
                    <span className="modifier-sign">{modifierSign}</span> 
                    <span className="total-equals"> = </span> 
                    <span className="total-value">{total}</span>
                </p>
            ) : (
                <p className="total">
                    <span className="total-value"> {total}</span>
                </p>
            )}
        </div>
    );
};

export default Results;
