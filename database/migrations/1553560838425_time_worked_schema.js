'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeWorkedSchema extends Schema {
  up () {
    this.create('time_workeds', (table) => {
      table.increments()
      table
      .integer('schedule_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('schedules')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.time('time_worked')
      table.timestamps()
    })
  }

  down () {
    this.drop('time_workeds')
  }
}

module.exports = TimeWorkedSchema
