'use strict'
const TimeWorked = use('App/Models/TimeWorked')
const User = use('App/Models/User')
const Database = use('Database');

class TimeWorkedController {

  async index () {
    const time = await User.query().with('time').fetch();
    
    return time
  }

  async store ({ request, auth, params }) {
    const data = request.only(['time_worked'])

    const timeSchedule = await TimeWorked.create({
      ...data,
      schedule_id: params.id,
      user_id: auth.user.id
    })

    return timeSchedule
  }

  async show ({ params }) {

    const time = await User.query().with('time').where('id', params.id).fetch()

    return time
  } 
 
  async report ({ request, params }) {
    
    const data = request.only(['first_date', 'second_date'])

    const reported = await Database.raw(`SELECT * FROM time_workeds INNER JOIN users ON time_workeds.user_id = users.id WHERE user_id = ${params.id} AND finished_job BETWEEN '${data.first_date}' AND '${data.second_date}'`)

    return reported
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TimeWorkedController
