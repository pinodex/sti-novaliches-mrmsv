'use strict'

const Event = use('Event'),
      Candidate = use('App/Model/Candidate'),
      Vote = use('App/Model/Vote'),
      User = use('App/Model/User'),
      UserTransformer = use('App/Components/UserTransformer')

class MainController {
  * index (request, response) {
    const user = yield request.auth.authenticator('user').getUser()

    if (user) {
      yield user.related('votes').load()
    }

    yield response.sendView('index', { user: yield UserTransformer.transform(user) })
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

    let vote = new Vote()

    vote.user_id = user.id
    vote.candidate_id = candidate.id

    yield vote.save()

    Event.fire('candidate.inc', candidate)

    response.status(204).send()
  }
}

module.exports = MainController
