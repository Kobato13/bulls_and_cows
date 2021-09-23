import React from 'react'
import './Button.css'

function OtherButtons({ className, onClick, buttonText, disabled, datatestid }) {
  return (
    <button 
      className={className} 
      onClick={onClick}
      disabled={disabled}
      datatest-id={datatestid}
    >{buttonText}
    </button>
  )
}

export default OtherButtons
