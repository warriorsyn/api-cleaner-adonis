'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  order () {
    return this.hasMany('App/Models/Order')
  }
}

module.exports = Product
