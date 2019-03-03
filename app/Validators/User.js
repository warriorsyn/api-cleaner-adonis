'use strict'

class User {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required',
      address: 'required',
      role: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'You must provide a name',
      'email.required': 'You must provide a email address',
      'email.unique': 'This email already have been registered',
      'password.required': 'You must provide a password',
      'address.required': 'You must provide a address',
      'role.required': 'You must provide the user role access'
    }
  }
}

module.exports = User
