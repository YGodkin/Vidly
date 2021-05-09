import React from 'react'

// const Input = ({ type, name, label, value, error, onChange }) => {
const Input = ({ name, label, error, ...rest }) => {
  //...rest will includ everything bar name label and error
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className='form-control' />
      {error && <div className='alert alert-danger'>{error}</div>}
      {/* add the error message in view */}
    </div>
  )
}

export default Input
