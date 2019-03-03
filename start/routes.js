'use strict'

const Route = use('Route')

Route.post('/login', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.post('/register', 'UserController.store').validator('User')
  Route.resource('schedule', 'ScheduleController')
    .apiOnly()
    .validator(new Map([[['schedule.store'], ['Schedule']]]))
    .middleware(
      new Map([
        [
          ['schedule.store', 'schedule.destroy', 'schedule.update'],
          ['is:administrator']
        ]
      ])
    )
}).middleware(['auth'])
