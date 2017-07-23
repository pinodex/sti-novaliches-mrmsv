'use strict'

const Category = use('App/Model/Category'),
      User = use('App/Model/User')

class VoteResult {

  static * get () {
    const categories = yield Category.query()
      .with('candidates', 'candidates.votes')
      .fetch()

    let result = {}

    categories.values().each(category => {
      let entry = {
        id: category.id,
        name: category.name,
        candidates: {}
      }

      if (category.relations.candidates instanceof Array) {
        result[category.id] = entry

        return true
      }

      category.relations.candidates.values().each(candidate => {
        let totalVotes = 0

        if (!(candidate.relations.votes instanceof Array)) {
          totalVotes = candidate.relations.votes.size()
        }

        entry.candidates[candidate.id] = {
          id: candidate.id,
          name: candidate.name,
          thumb_path: candidate.thumb_path,
          picture_path: candidate.picture_path,
          votes: totalVotes
        }
      })

      result[category.id] = entry
    })

    return result
  }

}

module.exports = VoteResult
