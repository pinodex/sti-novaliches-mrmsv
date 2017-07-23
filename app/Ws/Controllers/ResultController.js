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
  }

  * onGetResult () {
    const result = yield VoteResult.get()

    this.socket.toMe().emit('candidates', result)
  }

}

module.exports = ResultController
