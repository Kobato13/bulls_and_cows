import React from 'react'
import './Button.css'

function KeypadButton({ keyPad, keypadNum, disabled }) {
  return (
    <button onClick={() => keyPad(keypadNum)} disabled={disabled}>{keypadNum}</button>
  )
}

export default KeypadButton
