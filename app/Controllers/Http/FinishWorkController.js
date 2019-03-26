'use strict'

const Schedule = use('App/Models/Schedule')
class FinishWorkController {
  async update ({ request, params }) {
    const data = request.all()
    const schedule = await Schedule.findOrFail(params.id)

    schedule.merge(data)

    await schedule.save()

    return schedule
  }
}

module.exports = FinishWorkController
