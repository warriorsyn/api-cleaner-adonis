'use strict'
const TimeWorked = use('App/Models/TimeWorked')
const User = use('App/Models/User')
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
 
  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TimeWorkedController
