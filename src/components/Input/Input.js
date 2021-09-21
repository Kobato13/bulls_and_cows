import React from 'react'
import './Input.css'

function Input({ num }) {
  return (
    <input type = "text" value = {num} data-testid="guess-input" readOnly={true}/>
  )
}

export default Input
