'use strict'

const User = use('App/Models/User')
class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    if (!(await User.findBy('email', email))) {
      return response.status(400).send({ message: 'Email not found!' })
    }

    const token = await auth.attempt(email, password)

    const user = await User.findBy('email', email)
    const role = await user.getRoles()
    return { token, role }
  }
}

module.exports = SessionController
