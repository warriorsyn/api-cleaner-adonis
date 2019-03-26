'use strict'

class Product {
  get validadeAll () {
    return true
  }
  get rules () {
    return {
      name: 'required',
      price: 'required'
    }
  }
}

module.exports = Product
