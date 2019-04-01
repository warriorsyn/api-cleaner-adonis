'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Product = use('App/Models/Product')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Joao Victor de Andrade',
      email: 'joaovictorandrade32@hotmail.com',
      password: '123456',
      telephone: '(79) 99154-1139',
      address: 'Rua 5, Costa nova IV, 500',
      role: 'administrator'
    })

    const cliente = await User.create({
      name: 'Cleverson',
      email: 'cleverson@hotmail.com',
      password: '123456',
      telephone: '(79) 99154-1139',
      address: 'Rua 5, Costa nova IV, 520',
      role: 'client'
    })

    const colaborador = await User.create({
      name: 'Mariana',
      email: 'mariana@hotmail.com',
      password: '123456',
      telephone: '(79) 99154-1139',
      address: 'Rua 5, Costa nova V, 520',
      role: 'worker'
    })

    const admin = await Role.create({
      slug: 'administrator',
      name: 'Administrator'
    })

    const worker = await Role.create({
      slug: 'worker',
      name: 'Worker'
    })

    const client = await Role.create({
      slug: 'client',
      name: 'Client'
    })

    await colaborador.roles().attach([worker.id])
    await cliente.roles().attach([client.id])
    await user.roles().attach([admin.id])

    await user.schedule().create({
      work: 'Clean the house',
      date_time: new Date(),
      status: true,
      client_id: cliente.id,
      worker_id: colaborador.id
    })

    await Product.create({
      name: 'Poison',
      code: '010928838829374',
      quantity: 2
    })
  }
}

module.exports = DatabaseSeeder
