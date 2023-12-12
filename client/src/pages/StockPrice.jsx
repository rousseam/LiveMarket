import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function StockPrice() {
    const [symbol, setSymbol] = useState('');
    const navigate = useNavigate();
    const fetchStockPriceSymbol = () => {
        console.log(symbol)
        navigate(`/stockPrice/${symbol}`);
    }
    return (
        <div>
            <form onSubmit={fetchStockPriceSymbol}>
                <label>
                    Stock symbol
                    <input type='text' placeholder='enter stock symbol...' value={symbol} onChange={(e) => setSymbol(e.target.value)}></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}