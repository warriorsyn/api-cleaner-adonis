'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
class UserController {
  async store ({ request, response }) {
    // Responsible for user creation by Administrator
    const data = request.only([
      // Get the data sended
      'name',
      'email',
      'password',
      'telephone',
      'address'
    ])

    if (await User.findBy('email', data.email)) {
      // Verify if there's an email already registered
      return response.status(400).send({ message: 'Email already registered!' })
    }

    const role = await Role.findBy('slug', request.input('role')) // Serach for the role by slug (Worker or Client )

    if (!role) {
      // Search whether role exists
      return response
        .status(400)
        .send([{ message: 'Please choose a valid role', field: 'role' }])
    }

    const user = await User.create({
      ...data,
      role: request.input('role')
    }) // Create an user

    await user.roles().attach([role.id]) // Attach a role to the user created

    return user // return the user data
  }

  async getClient() {
    const user = await User.query().where('role', 'client').fetch()
 
    return user    
  }

  async getWorkers() {
    const user = await User.query().where('role', 'worker').fetch()
 
    return user 
  }

}

module.exports = UserController
