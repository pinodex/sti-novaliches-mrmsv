'use strict'

const Env = use('Env'),
      Candidate = use('App/Model/Candidate'),
      Category = use('App/Model/Category'),
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

      let pathPrefix = '/storage/'

      if (Env.get('NODE_ENV') === 'production') {
        pathPrefix = Env.get('CDN_BASE') + '/storage/'
      }

      result.push({
        id: candidate.id,
        category_id: candidate.category_id,
        name: candidate.name,
        thumb_path: pathPrefix + candidate.thumb_path,
        picture_path: pathPrefix + candidate.picture_path,
        votes: totalVotes,
        pulse: false
      })
    })

    shuffle(result)

    return result
  }

  static * getCategories () {
    const categories = yield Category.all()

    let result = []

    categories.each(category => {
      result.push({
        id: category.id,
        name: category.name,
        is_active: category.is_active
      })
    })

    shuffle(result)

    return result
  }

}

module.exports = VoteResult
