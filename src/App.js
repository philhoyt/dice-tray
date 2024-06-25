import React, { useState } from 'react';
import DiceControls from './components/DiceControls';
import DiceLoader from './components/DiceLoader';
import DiceTray from './components/DiceTray';
import Results from './components/Results';
import './App.css';

const App = () => {
    const [dice, setDice] = useState([]);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);

    const handleAddDie = (type) => {
        setDice([...dice, type]);
    };

    const handleClearDice = () => {
        setDice([]);
        setResults([]);
        setTotal(0);
    };

    const handleRemoveDie = (index) => {
        const newDice = dice.filter((_, i) => i !== index);
        setDice(newDice);
    };

    const handleRollDice = () => {
        const newResults = dice.map((die) => {
            const sides = parseInt(die.substring(1), 10);
            const result = Math.floor(Math.random() * sides) + 1;
            return { die, result };
        });

        const newTotal = newResults.reduce((acc, curr) => acc + curr.result, 0);

        setResults(newResults);
        setTotal(newTotal);
    };

    return (
        <div className="App">
            <h1>Dice Tray</h1>
            <DiceControls onAddDie={handleAddDie} onClearDice={handleClearDice} />
            <DiceLoader dice={dice} onRemoveDie={handleRemoveDie} />
            <button onClick={handleRollDice}>Roll Dice</button>
            <DiceTray results={results} />
            <Results total={total} />
        </div>
    );
};

export default App;
