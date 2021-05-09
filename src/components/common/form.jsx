import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './select'

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(
      this.state.data,
      this.schema,
      options
      // {abortEarly: false}
    )
    if (!error) return null

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema)
    return error ? error.details[0].message : null
  }
  handleSubmit = e => {
    // handle the page reload
    e.preventDefault()

    const errors = this.validate()
    // console.log(errors)
    this.setState({ errors: errors || {} })
    if (errors) return

    // const username = this.username.current.value
    this.doSubmit()
  }
  handleChange = ({ currentTarget: input }) => {
    //e change to ({currentTarget: input})

    const errors = { ...this.state.errors }
    const errorsMessage = this.validateProperty(input)
    if (errorsMessage) errors[input.name] = errorsMessage
    else delete errors[input.name]
    //adding error message when the texts has been removed from required fild

    const data = { ...this.state.data }
    // data.username = e.currentTarget.value
    // this is only change username
    data[input.name] = input.value
    //this is hangle change everything
    //"e.currentTarget.name" change to "input.value"
    this.setState({ data, errors })
  }

  renderButton (label) {
    return (
      <button disabled={this.validate()} className='btn btn-primary'>
        {label}
      </button>
    )
  }

  renderSelect (name, label, options) {
    const { data, errors } = this.state
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]} //add the error message
      />
    )
  }

  renderInput (name, label, type = 'text') {
    const { data, errors } = this.state
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]} //add the error message
      />
    )
  }
}

export default Form
