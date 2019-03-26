'use strict'

const Route = use('Route')

Route.post('/login', 'SessionController.store').validator('Session') // Login Route

Route.group(() => {
  // Group of routes
          ['is:administrator']
          Route.post('/register', 'UserController.store').validator('User').middleware(['is:administrator']) // Register an user ['is:administrator']
  Route.resource('schedule', 'ScheduleController') // Crud schedule routes [['store', 'delete', 'update'], ['is:administrat or']]
    .apiOnly()
    .validator(new Map([[['schedule.store'], ['Schedule']]]))
    .middleware(
      new Map([
        [
          ['schedule.store', 'schedule.destroy', 'schedule.update'],
          ['is:administrator']
        ]
      ])
    ) // Access midleware ['Administrator']

  Route.put('/finish/:id', 'FinishWorkController.update').middleware(['is:worker']) // Change schedule status to done(1)
  Route.post('/timeworked/schedule/:id', 'TimeWorkedController.store').middleware(['is:worker'])
  Route.resource('product', 'ProductController')
    .apiOnly()
    .middleware(
      new Map([
        [
          ['product.store', 'product.destory', 'product.update'],
          ['is:administrator']
        ]
      ])
    )

  Route.resource('order', 'OrderController').apiOnly()
}).middleware(['auth']) // Authenticate midleware
