'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Product = use('App/Models/Product')
const TimeWorked = use('App/Models/TimeWorked')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Administrator',
      email: 'admin@yung.com',
      password: 'admin@yung',
      role: 'administrator'
    })

    // const cliente = await User.create({
    //   name: 'Cleverson',
    //   email: 'cleverson@hotmail.com',
    //   password: '123456',
    //   telephone: '(79) 99154-1139',
    //   address: 'Rua 5, Costa nova IV, 520',
    //   role: 'client'
    // })

    // const colaborador = await User.create({
    //   name: 'Mariana',
    //   email: 'mariana@hotmail.com',
    //   password: '123456',
    //   telephone: '(79) 99154-1139',
    //   address: 'Rua 5, Costa nova V, 520',
    //   role: 'worker'
    // })

    const admin = await Role.create({
      slug: 'administrator',
      name: 'Administrator'
    })

    await Role.create({
      slug: 'worker',
      name: 'Worker'
    })

    await Role.create({
      slug: 'client',
      name: 'Client'
    })

    await user.roles().attach([admin.id])

    // const schedule = await user.schedule().create({
    //   work: 'Clean the house',
    //   date_time: new Date(),
    //   status: true,
    //   client_id: cliente.id,
    //   worker_id: colaborador.id
    // })

    // await Product.create({
    //   name: 'Poison',
    //   code: '010928838829374',
    //   quantity: 2
    // })

    // await TimeWorked.create({
    //   schedule_id: schedule.id,
    //   user_id: colaborador.id,
    //   client_id: cliente.id,
    //   finished_job: '2019-04-02',
    //   time_worked: "4:00"
    // })
  }
}

module.exports = DatabaseSeeder
