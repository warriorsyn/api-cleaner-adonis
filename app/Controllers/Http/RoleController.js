'use strict'

const Role = use('Adonis/Acl/Role')
class RoleController { //Responsible for return all roles
  async index () {
    const roles = await Role.all() //Search for all roles

    return roles
  }
}

module.exports = RoleController
