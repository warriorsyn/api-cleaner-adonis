'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'ScheduleEmailHook.sendScheduleEmail')
  }
  users () {
    return this.belongsTo('App/Models/User')
  }

  checklist () {
    return this.hasMany('App/Models/Checklist')
  }

  // order () {
  //   return this.belongsTo('App/Models/Order')
  // }
}

module.exports = Schedule
