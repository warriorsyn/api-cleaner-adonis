'use strict'

class Schedule {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      work: 'required',
      date_time: 'required'
    }
  }

  get messages () {
    return {
      'work.required': 'You must provide the schedule name!',
      'date_time.required': 'You must provide the date and time!'
    }
  }
}

module.exports = Schedule
