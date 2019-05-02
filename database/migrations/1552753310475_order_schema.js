'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', table => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('schedule_id')
        .unsigned()
        .references('id')
        .inTable('schedules')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table
        .boolean('status')
        .notNullable()
        .defaultTo(false)
      table.date('finished_order')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
