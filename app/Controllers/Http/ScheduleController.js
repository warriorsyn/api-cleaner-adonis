'use strict'

const Schedule = use('App/Models/Schedule')
const Checklist = use('App/Models/Checklist')
class ScheduleController {
  async index () {
    const schedules = await Schedule.all()

    return schedules
  }

  async store ({ request, auth }) {
    const data = request.only([
      'work',
      'observe',
      'date_time',
      'client_id',
      'worker_id'
    ])
    const schedule = await auth.user.schedule().create({
      ...data,
      user_id: auth.user.id
    })

    const checklists = request.input('checklist')

    const checklistData = checklists.map(task => ({
      task,
      schedule_id: schedule.id
    }))
    const checklist = await Checklist.createMany(checklistData)

    return { schedule, checklist }
  }

  async show ({ params }) {
    const schedule = await Schedule.findOrFail(params.id)

    return schedule
  }

  async update ({ params, request, auth }) {
    const data = request.only(['work', 'observe', 'date_time'])

    const schedule = await auth.user
      .schedule()
      .where('id', params.id)
      .first()

    schedule.merge(data)

    await schedule.save()

    return schedule
  }

  async destroy ({ params, auth }) {
    const schedule = await auth.user
      .schedule()
      .where('id', params.id)
      .first()

    await schedule.delete()
  }
}

module.exports = ScheduleController
