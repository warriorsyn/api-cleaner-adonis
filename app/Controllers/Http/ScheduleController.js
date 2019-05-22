'use strict'

const Schedule = use('App/Models/Schedule')
const Checklist = use('App/Models/Checklist')
class ScheduleController {
  // Responsible for Schedule CRUD
  async index () {
    // Return all schedules
    const schedules = await Schedule.query()
      .orderBy('created_at', 'desc')
      .fetch()

    return schedules
  }

  async store ({ request, auth }) {
    // Create a schedule
    const data = request.only([
      // Get data
      'work',
      'observe',
      'date_time',
      'client_id',
      'worker_id',
      'address'
    ])
    const schedule = await auth.user.schedule().create({
      // Create an Schedule with relationshib between User an Schedule
      ...data,
      user_id: auth.user.id
    })

    const checklists = request.input('checklist') // Get the checklists ['Array']

    const checklistData = checklists.map(task => ({
      // Trasnform the checklist to increase with schedule id
      task,
      schedule_id: schedule.id
    }))
    const checklist = await Checklist.createMany(checklistData) // Create many checklists

    return { schedule, checklist } // Return the schedule and checklists recently created
  }

  async show ({ params }) {
    // Get Schedule by id
    const schedule = await Schedule.query()
      .where('id', params.id)
      .with('checklist')
      .first() // Search schedule by param (ID)

    return schedule
  }

  async update ({ params, request, auth }) {
    // Update schedule by id
    const data = request.only(['work', 'observe', 'date_time']) // Get data input

    const schedule = await auth.user // Search for schedule by id
      .schedule()
      .where('id', params.id)
      .first()

    schedule.merge(data) // Make a merge

    await schedule.save() // Save the merge ['Update']

    return schedule
  }

  async destroy ({ params, auth }) {
    // Delete schedule by id
    const schedule = await auth.user // Search for schedule by id
      .schedule()
      .where('id', params.id)
      .first()

    await schedule.delete() // Delete the schedule
  }

  async getByAuth ({ auth }) {
    const schedule = await Schedule.query()
      .where('worker_id', auth.user.id)
      .orderBy('created_at', 'desc')
      .fetch()

    return schedule
  }
}

module.exports = ScheduleController
