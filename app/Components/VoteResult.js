'use strict'

const Candidate = use('App/Model/Candidate'),
      shuffle = require('knuth-shuffle').knuthShuffle

class VoteResult {

  static * get () {
    const candidates = yield Candidate.query()
      .with('votes')
      .fetch()

    let result = []

    candidates.each(candidate => {
      let totalVotes = 0

      if (!(candidate.relations.votes instanceof Array)) {
        totalVotes = candidate.relations.votes.size()
      }

      result.push({
        id: candidate.id,
        category_id: candidate.category_id,
        name: candidate.name,
        thumb_path: candidate.thumb_path,
        picture_path: candidate.picture_path,
        votes: totalVotes
      })
    })

    shuffle(result)

    return result
  }

}

module.exports = VoteResult
