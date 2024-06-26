import React from 'react';

const Results = ({ results = [], total, discardedRoll }) => {
    const diceTotal = results.reduce((acc, curr) => acc + curr.result, 0);
    const modifier = total - diceTotal;
    const modifierSign = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;

    return (
        <div>
            <h2>Results</h2>
            {modifier !== 0 ? (
                <div>
                    <p>
                        <span className='modifier'>Modifier: {modifier}</span>
                    </p>
                    <p className="total">
                        <span className="dice-total">{diceTotal} </span> 
                        <span className="modifier-sign">{modifierSign}</span> 
                        <span className="total-equals"> = </span> 
                        <span className="total-value">{total}</span>
                    </p>
                </div>
            ) : (
                <p className="total">
                    <span className="total-value"> {total}</span>
                </p>
            )}
			<div className='results-dice'>
				<div>
					<ul>
						{results.map((result, index) => (
							<li key={index}>
								{result.die}: {result.result}
							</li>
						))}
					</ul>
				</div>
				{discardedRoll !== null && (
					<div className='results-dice__discarded'>
						<ul>
							{discardedRoll.map((result, index) => (
								<li key={index}>
									{results[index].die}: {result}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
        </div>
    );
};

export default Results;
