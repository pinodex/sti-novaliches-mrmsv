'use strict'

const Event = use('Event'),
      Vote = use('App/Model/Vote'),
      Candidate = use('App/Model/Candidate'),
      VoteResult = use('App/Components/VoteResult'),
      UserTransformer = use('App/Components/UserTransformer')

class MainController {
  * index (request, response) {
    const user = yield request.auth.authenticator('user').getUser(),
          candidates = yield VoteResult.get(),
          categories = yield VoteResult.getCategories()

    if (user) {
      yield user.related('votes').load()
    }

    yield response.sendView('index', {
      extended_meta_tags: true,
      user: yield UserTransformer.transform(user),
      categories, candidates, request
    })
  }

  * vote (request, response) {
    const candidate = yield Candidate.find(request.input('candidate_id')),
          user = yield request.auth.authenticator('user').getUser()

    if (!candidate) {
      response.status(404).send({
        error: {
          message: 'Cannot find candidate'
        }
      })

      return
    }

    yield candidate.related('category').load()

    if (!candidate.relations.category || !candidate.relations.category.is_active) {
      response.status(400).send({
        error: {
          message: 'Candidate category is closed'
        }
      })

      return
    }

    yield user.related('votes', 'votes.candidate').load()

    let categoryAlreadyVoted = false

    user.relations.votes.values().each(vote => {
      if (vote.relations.candidate.category_id == candidate.category_id) {
        categoryAlreadyVoted = true

        return false
      }
    })

    if (categoryAlreadyVoted) {
      response.status(403).send({
        error: {
          message: 'Category already voted'
        }
      })

      return
    }

    let vote = new Vote()

    vote.user_id = user.id
    vote.candidate_id = candidate.id

    yield vote.save()

    Event.fire('candidate.voted', candidate)

    response.status(204).send()
  }
}

module.exports = MainController
