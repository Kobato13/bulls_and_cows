import React from 'react'
import './Guess.css'

function Guess({ guess, highlight }) {
  return (
    <li className={highlight ? highlight : ''}> 
    <p>Bulls: {guess.bull}</p>
    <p>Cows: {guess.cow}</p>
    <p className="guess-item">Guess: {guess.guessNum}</p>
    </li>
  )
}

export default Guess
