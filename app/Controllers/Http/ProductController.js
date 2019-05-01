'use strict'

const Product = use('App/Models/Product')
const Database = use('Database')

class ProductController {
  async index () {
    const product = await Product.all()

    return product
  }

  async store ({ request }) {
    const data = request.only(['name', 'code', 'quantity'])

    const product = await Product.create(data)

    return product
  }

  async show ({ params }) {
    const product = await Product.findOrFail(params.id)

    return product
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'code', 'quantity'])

    const product = await Product.findOrFail(params.id)

    product.merge(data)

    await product.save()

    return product
  }

  async getReport ({ request, params }) {
    const data = request.only(['first_date', 'second_date'])

    const report = await Database.raw(
      `SELECT products.name,orders.*, schedules.client_id FROM orders JOIN products ON products.id = orders.product_id JOIN schedules ON schedules.id = orders.schedule_id WHERE schedules.client_id = ${
        params.id
      } AND orders.finished_order BETWEEN '${data.first_date}' AND '${
        data.second_date
      }'`
    )

    return report
  }

  async destroy ({ params }) {
    const product = await Product.findOrFail(params.id)

    product.delete()
  }
}

module.exports = ProductController
