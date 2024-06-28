import React, { useState, useEffect } from 'react';
import DiceControls from './components/DiceControls';
import DiceLoader from './components/DiceLoader';
import DiceTray from './components/DiceTray';
import Results from './components/Results';
import RollHistory from './components/RollHistory';
//import BuyMeCoffee from './components/BuyMeCoffee';
import './App.css';

const App = () => {
    const [dice, setDice] = useState([]);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [history, setHistory] = useState([]);
    const [modifier, setModifier] = useState(0);
    const [rollType, setRollType] = useState('normal');
    const [discardedRolls, setDiscardedRolls] = useState([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('rollHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const handleAddDie = (type) => {
        setDice([...dice, type]);
    };

    const handleClearDice = () => {
        setDice([]);
        setResults([]);
        setTotal(0);
        setModifier(0);
        setDiscardedRolls([]);
    };

    const handleRemoveDie = (index) => {
        const newDice = dice.filter((_, i) => i !== index);
        setDice(newDice);
    };

    const handleRemoveResult = (index) => {
        const newResults = results.filter((_, i) => i !== index);
        const newTotal = newResults.reduce((acc, curr) => acc + curr.result, 0);
        setResults(newResults);
        setTotal(newTotal);
    };

    const handleRollDice = () => {
        const rollDice = () => {
            return dice.map((die) => {
                const sides = parseInt(die.substring(1), 10);
                return Math.floor(Math.random() * sides) + 1;
            });
        };

        const roll1 = rollDice();
        const roll2 = rollDice();

        const total1 = roll1.reduce((acc, curr) => acc + curr, 0);
        const total2 = roll2.reduce((acc, curr) => acc + curr, 0);

        let finalTotal;
        let discarded;
        if (rollType === 'advantage') {
            finalTotal = Math.max(total1, total2);
            discarded = total1 === finalTotal ? roll2 : roll1;
        } else if (rollType === 'disadvantage') {
            finalTotal = Math.min(total1, total2);
            discarded = total1 === finalTotal ? roll2 : roll1;
        } else {
            finalTotal = total1;
            discarded = [];
        }

        const newResults = dice.map((die, index) => {
            const result = finalTotal === total1 ? roll1[index] : roll2[index];
            return { die, result };
        });

        const newTotal = finalTotal + modifier;

        setResults(newResults);
        setTotal(newTotal);
        setDiscardedRolls(discarded);

        const newHistory = [
            ...history,
            { timestamp: Date.now(), dice, results: newResults, modifier, total: newTotal, discardedRolls: discarded, rollType }
        ];
        setHistory(newHistory);
        localStorage.setItem('rollHistory', JSON.stringify(newHistory));
    };

    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem('rollHistory');
    };

    const handleModifierChange = (newModifier) => {
        setModifier(newModifier);
    };

    return (
        <div className="App">
			<div>
            	<h1>Dice Tray</h1>
			</div>
            <DiceControls onAddDie={handleAddDie} onClearDice={handleClearDice} />
            <DiceLoader dice={dice} onRemoveDie={handleRemoveDie} onClearDice={handleClearDice} onModifierChange={handleModifierChange} />
            <div className="radio-group">
                <input type="radio" id="normal" name="rollType" value="normal" checked={rollType === 'normal'} onChange={() => setRollType('normal')} />
                <label htmlFor="normal">Normal</label>
                <input type="radio" id="advantage" name="rollType" value="advantage" checked={rollType === 'advantage'} onChange={() => setRollType('advantage')} />
                <label htmlFor="advantage">Advantage</label>
                <input type="radio" id="disadvantage" name="rollType" value="disadvantage" checked={rollType === 'disadvantage'} onChange={() => setRollType('disadvantage')} />
                <label htmlFor="disadvantage">Disadvantage</label>
            </div>
            <button onClick={handleRollDice}>Roll Dice</button>
            <DiceTray results={results} onRemoveResult={handleRemoveResult} />
            <Results total={total} results={results} discardedRoll={discardedRolls} />
            <RollHistory history={history} onClearHistory={handleClearHistory} />
        </div>
    );
};

export default App;
