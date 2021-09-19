import React from 'react'
import Guess from "./Guess"

function GuessList({ guess, highlight }) {
  return (
    guess.map(g => {
      return <Guess 
        key={g.id}
        guess={g}
        highlight={highlight}
        />
    })
  )
}

export default GuessList
