import React from 'react'
import './Error.css'

function Error({ error }) {
  return (
    <p className="error" datatest-id="error-test">{error}</p>
  )
}

export default Error
