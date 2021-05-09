import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  }

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  }
  username = React.createRef()
  //   componentDidMount () {
  //     this.username.current.focus()
  //   }
  // row 4 to 6 is focus on username input area, this can be simpfiled with autoFoces in input, see row 23

  doSubmit = () => {
    //call the server
    console.log('Submitted')
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    )
  }
}

export default LoginForm
