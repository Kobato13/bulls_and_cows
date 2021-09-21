import React from 'react'
import './Input.css'

function Input({ num }) {
  return (
    <input type = "text" value = {num} aria-label="guess-input" readOnly={true}/>
  )
}

export default Input
