'use strict'
const TimeWorked = use('App/Models/TimeWorked')
class TimeWorkedController {

  async index ({ request, response, view }) {
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

  async show ({ params, request, response, view }) {
  }
 
  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TimeWorkedController
