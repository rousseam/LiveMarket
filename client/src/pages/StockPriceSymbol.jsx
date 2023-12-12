import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

// BINANCE:BTCUSDT
export default function StockPriceSymbol() {
    const {symbol} = useParams();
    const [stockPrice, setStockPrice] = useState(0);
    const [diffPercent, setDiffPercent] = useState(0);
    const [quote, setQuote] = useState({});
    const socket = new WebSocket('wss://ws.finnhub.io?token=cl976g9r01qjo3godrl0cl976g9r01qjo3godrlg');

    socket.onopen = (event) => {
        socket.send(JSON.stringify({'type':'subscribe', symbol}));
    }
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setStockPrice(message.data.pop().p);
        if (quote) {
            setDiffPercent((stockPrice - quote.pc)/quote.pc * 100)
        }
    };

    useEffect(() => {
        const doAsync = async () => {
            if (!symbol) {
                console.log('not symbol in react');
            } else {
                try {
                    const {data} = await axios.get(`/quote/${symbol}`)
                    setQuote(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        if (symbol) {
            doAsync();
        }
    }, [symbol]);

    return (
        <div style={{outline: '2px solid #646cffaa', borderRadius: '2rem', fontSize: '0.4em', display: 'grid'}}>
            <div>{stockPrice ? (<h1>{symbol} : {stockPrice}$</h1>) : (<h1>{symbol} : {quote.c}$</h1>)}</div>
            <div>{diffPercent ? (<h1>Variation: {JSON.stringify(diffPercent)}</h1>) : (<h1>Variation: {JSON.stringify(quote.dp)}</h1>)}</div>
        </div>
    )
}
