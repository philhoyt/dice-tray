import React from 'react';

const BuyMeCoffee = () => {

    return (
        <div>
            <details style={{display: 'block', marginTop: '1rem'}}>
                <summary>Support</summary>
                <a href="https://www.buymeacoffee.com/philhoyt" target="_blank" rel="noreferrer" style={{display: 'block', marginTop: '1rem'}}>
                    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: '60px', width: '217px' }} />
                </a>
                <a href="https://github.com/philhoyt/dice-tray/issues" target="_blank" rel="noreferrer" style={{display: 'block', marginTop: '1rem'}}>
                    Report an issue
                </a>
            </details>
        </div>
    );
};

export default BuyMeCoffee;
