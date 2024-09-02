import React, { useState } from 'react';

function AlertForm() {
    const [alertValue, setAlertValue] = useState('');
    const [direction, setDirection] = useState('UP');
    const [indicator, setIndicator] = useState('RSI');
    const [status, setStatus] = useState('PENDING');

    const handleSubmit = (e) => {
        e.preventDefault();

        const alertData = {
            alertValue: parseFloat(alertValue),
            direction,
            indicator,
            status
        };

        fetch('http://localhost:8080/alerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alertData),
        })
        .then(response => response.json())
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Alert Value:</label>
                <input
                    type="number"
                    value={alertValue}
                    onChange={(e) => setAlertValue(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Direction:</label>
                <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                    <option value="UP">UP</option>
                    <option value="DOWN">DOWN</option>
                </select>
            </div>
            <div>
                <label>Indicator:</label>
                <select value={indicator} onChange={(e) => setIndicator(e.target.value)}>
                    <option value="RSI">RSI</option>
                    <option value="MACD">MACD</option>
                </select>
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="PENDING">PENDING</option>
                </select>
            </div>
            <button type="submit">Create Alert</button>
        </form>
    );
}

export default AlertForm;
