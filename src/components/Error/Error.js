import React from 'react'
import './Error.css'

function Error({ error }) {
  return (
    <p className="error">{error}</p>
  )
}

export default Error
