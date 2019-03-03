'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
class UserController {
  async store ({ request, response }) {
    const data = request.only([
      'name',
      'email',
      'password',
      'telephone',
      'address'
    ])

    if (await User.findBy('email', data.email)) {
      return response.status(400).send({ message: 'Email already registered!' })
    }

    const role = await Role.findBy('slug', request.input('role'))

    if (!role) {
      return response
        .status(400)
        .send([{ message: 'Please choose a valid role', field: 'role' }])
    }

    const user = await User.create(data)

    await user.roles().attach([role.id])

    return user
  }
}

module.exports = UserController
