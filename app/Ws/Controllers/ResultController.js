'use strict'

const Event = use('Event'),
      VoteResult = use('App/Components/VoteResult'),
      co = require('co')

class ResultController {

  constructor (socket, request, presence) {
    this.socket = socket

    if (!Event.hasListeners('candidate.inc')) {
      Event.when('candidate.inc', candidate => {
        this.socket.toEveryone().emit('candidate.inc', {
          candidate_id: candidate.id,
          category_id: candidate.category_id
        })
      })
    }
  }

  * onUpdate () {
    const result = yield VoteResult.get()

    this.socket.toMe().emit('data', result)
  }

}

module.exports = ResultController
