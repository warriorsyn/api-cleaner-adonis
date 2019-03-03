'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChecklistSchema extends Schema {
  up () {
    this.create('checklists', table => {
      table.increments()
      table.string('task')
      table
        .integer('schedule_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('schedules')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('checklists')
  }
}

module.exports = ChecklistSchema
