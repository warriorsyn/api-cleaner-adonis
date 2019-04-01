'use strict'

const User = use('App/Models/User')
class SessionController {
  // responsible for made the sign in of an user
  async store ({ request, response, auth }) {
    const { email, password } = request.all() // Get input data

    if (!(await User.findBy('email', email))) {
      // Verify whether email exists
      return response.status(400).send({ message: 'Email not found!' })
    }

    const token = await auth.attempt(email, password) // Create the JSW

    const user = await User.findBy('email', email) // Search an user by email
    // const role = await user.getRoles() // return the user's role
    return {token, user}
  }
}

module.exports = SessionController
