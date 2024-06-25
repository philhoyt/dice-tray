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
			<div className='total'>
            {modifier !== 0 ? (
                <p>Total: {diceTotal} {modifierSign} = {total}</p>
            ) : (
                <p>Total: {total}</p>
            )}
			</div>
        </div>
    );
};

export default Results;
