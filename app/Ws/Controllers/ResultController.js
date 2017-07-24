'use strict'

const Event = use('Event'),
      VoteResult = use('App/Components/VoteResult'),
      co = require('co')

class ResultController {

  constructor (socket, request, presence) {
    this.socket = socket

    if (!Event.hasListeners('candidate.voted')) {
      Event.when('candidate.voted', candidate => {
        this.socket.toEveryone().emit('candidate.voted', candidate.id)
      })
    }

    if (!Event.hasListeners('candidates.update')) {
      Event.when('candidates.update', data => {
        this.socket.toEveryone().emit('candidates.update', data)
      })
    }

    if (!Event.hasListeners('categories.update')) {
      Event.when('categories.update', data => {
        this.socket.toEveryone().emit('categories.update', data)
      })
    }
  }

  * onGetResult () {
    const result = yield VoteResult.get()

    this.socket.toMe().emit('candidates', result)
  }

}

module.exports = ResultController
