import React from 'react'
import './Button.css'

function OtherButtons({ className, onClick, buttonText, disabled}) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>{buttonText}</button>
  )
}

export default OtherButtons
