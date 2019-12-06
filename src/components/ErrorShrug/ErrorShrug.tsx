import React from 'react'
import './styles.css';
export function ErrorShrug(){
  return (

  <div className="ion-text-center shrug-error">
    <div className="wrapper">
      <svg id="shruggie" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100">
        <line x1={ 25 } y1={ 32 } x2={ 50 } y2={ 32 } className="shrug hand-l"/>
        <line x1={ 55 } y1={ 30 } x2={ 65 } y2={ 60 } className="shrug forearm-l"/>
        <line x1={ 70 } y1="65" x2="95" y2="65" className="shrug shoulder-l"/>
        <path d="M100,23 Q80,43 100,65" className="shrug head"/>
        <path d="M105,25 Q107,30 108,35" className="shrug head eye-l"/>
        <path d="M119,25 Q120,30 119,35" className="shrug head eye-r"/>
        <path d="M110,60 Q135,60 135,33" className="shrug smile"/>
        <path d="M135,23 Q155,43 135,65" className="shrug head"/>
        <line x1="140" y1="65" x2="165" y2="65" className="shrug shoulder-r"/>
        <line x1="170" y1="60" x2="180" y2="30" className="shrug forearm-r"/>
        <line x1="185" y1="32" x2="210" y2="32" className="shrug hand-r"/>
      </svg>
    </div>
    <h3>Well this is embarrassing, there seems to be an issue fetching data! </h3>
  </div>

  )
}
