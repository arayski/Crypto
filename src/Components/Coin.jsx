import React from 'react'

export default function Coin( {name, icon, price, symbol } ) {
  return (
    <div className="coin">
        <h1> Name: {name} </h1>
        <img src={icon} />
        <h3> Price: {price} </h3>
        <h3> symbol: {symbol}</h3>
    </div>
  )
}
