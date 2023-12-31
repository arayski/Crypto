import { useEffect, useState } from 'react';
import './App.css';
import Coin from './Components/Coin';

export default function App() {

  const [cryptos, setCryptos] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  
  useEffect(() => {
    const key = import.meta.env.VITE_KEY;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-KEY': key
      }
    };
    
    fetch('https://openapiv1.coinstats.app/coins?limit=100', options)
      .then(response => response.json())
      .then(response => {
        setCryptos(response.result);
        console.log(response.result); // Set state inside the promise chain
      })
      .catch(err => console.error(err));

    
    console.log("Page Rendered Properly");
  }, []);

  const filtered_coins = cryptos.filter((coin) => {
    return coin.name.toLowerCase().includes(searchCoin.toLowerCase());
  });

  return (

      <div className="App">
        <div className="cryptoHeader">
          <input 
            type="text" 
            placeholder='Bitcoin...' 
            onChange={(event) => { 
              setSearchCoin(event.target.value); 
            }}
          />

        </div>

        <div className="cryptoDisplay">
          
          {filtered_coins.map(crypto => (
              <Coin 
                name={crypto.name} 
                icon={crypto.icon} 
                price={crypto.price.toFixed(2)} 
                symbol={crypto.symbol}
              />
          ))}
          
        </div>
        
      </div>

  );

}

/*<li key={crypto.id}>
            <img src={crypto.icon} alt={crypto.name} style={{ width: '20px', height: '20px' }} />
            <strong>{crypto.name} ({crypto.symbol}):</strong> ${crypto.price.toFixed(2)}
          </li> */