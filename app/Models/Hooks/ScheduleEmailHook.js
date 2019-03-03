'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')
const ScheduleEmailHook = (exports = module.exports = {})

ScheduleEmailHook.sendScheduleEmail = async schedule => {
  const workerId = schedule.worker_id
  const clientId = schedule.client_id

  const user = await User.findBy('id', workerId)
  const client = await User.findBy('id', clientId)
  await Mail.send(
    ['emails.schedule'],
    { user: user.name, client: client.name, address: client.address },
    message => {
      message
        .to(user.email)
        .from('joaovictordeandrade32@hotmail.com', 'Joao | Company')
        .subject('New schedule was added to you')
    }
  )
}
