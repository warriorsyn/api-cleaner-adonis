'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  role () {
    return this.belongsToMany('Adonis/Acl/Role')
  }

  permission () {
    return this.belongsToMany('Adonis/Acl/Permission')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  schedule () {
    return this.hasMany('App/Models/Schedule')
  }
}

module.exports = User
