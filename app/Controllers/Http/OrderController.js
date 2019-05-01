'use strict'

const Schedule = use('App/Models/Schedule')
const Order = use('App/Models/Order')

class OrderController {
  async index () {
    const order = await Order.query()
      .with('product')
      .with('schedule')
      .fetch()

    return order
  }

  async store ({ request, auth }) {
    const data = request.only(['quantity', 'product_id'])

    const scheduleId = await Schedule.query()
      .where('worker_id', auth.user.id)
      .orderBy('created_at', 'desc')
      .first()

    const order = await Order.create({
      ...data,
      schedule_id: scheduleId.id
    })

    return order
  }

  async show ({ params }) {
    const order = await Order.findOrFail(params.id)

    await order.loadMany(['product', 'schedule'])

    return order
  }

  async update ({ params, request }) {
    const data = request.all()

    const order = await Order.findOrFail(params.id)

    order.merge(data)

    order.save()

    return order
  }

  async destroy ({ params, request, response }) {}
}

module.exports = OrderController
