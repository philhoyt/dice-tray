import React, { useState, useEffect } from 'react';
import DiceControls from './components/DiceControls';
import DiceLoader from './components/DiceLoader';
import DiceTray from './components/DiceTray';
import Results from './components/Results';
import RollHistory from './components/RollHistory';
import './App.css';

const App = () => {
    const [dice, setDice] = useState([]);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [history, setHistory] = useState([]);
    const [modifier, setModifier] = useState(0);

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
        const newResults = dice.map((die) => {
            const sides = parseInt(die.substring(1), 10);
            const result = Math.floor(Math.random() * sides) + 1;
            return { die, result };
        });

        const diceTotal = newResults.reduce((acc, curr) => acc + curr.result, 0);
        const newTotal = diceTotal + modifier;

        setResults(newResults);
        setTotal(newTotal);

        const newHistory = [
            ...history,
            { timestamp: Date.now(), dice, results: newResults, modifier, total: newTotal }
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
            <h1>Dice Tray</h1>
            <DiceControls onAddDie={handleAddDie} onClearDice={handleClearDice} />
            <DiceLoader dice={dice} onRemoveDie={handleRemoveDie} onClearDice={handleClearDice} onModifierChange={handleModifierChange} />
            <button onClick={handleRollDice}>Roll Dice</button>
            <DiceTray results={results} onRemoveResult={handleRemoveResult} />
            <Results total={total} results={results} />
            <RollHistory history={history} onClearHistory={handleClearHistory} />
        </div>
    );
};

export default App;
