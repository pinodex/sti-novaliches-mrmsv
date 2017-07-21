'use strict'

const Candidate = use('App/Model/Candidate')

class UserTransformer {

  static * transform(user) {
    if (!user) {
      return null
    }

    let candidates = [],
        categories = []

    if (user.relations.votes) {
      yield user.related('votes.candidate').load()

      user.relations.votes.values().each(vote => {
        candidates.push(vote.candidate_id)

        if (vote.relations.candidate) {
          categories.push(vote.relations.candidate.category_id)
        }
      })
    }

    return {
      fbid: user.fbid,
      name: user.name,
      avatar: user.avatar,
      candidates, categories
    }
  }

}

module.exports = UserTransformer
