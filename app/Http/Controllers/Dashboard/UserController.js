'use strict'

const User = use('App/Model/User')

class UserController {

  * index (request, response) {
    const page = request.input('page', 1),
          nameSearch = request.input('name')

    const result = yield User.query()
      .where(function () {
        if (nameSearch) {
          this.where('name', 'LIKE', `%${nameSearch}%`)
        }
      })
      .orderBy('name')
      .paginate(page)

    yield response.sendView('dashboard/user/index', {
      nameSearch, page, result: result.toJSON()
    })
  }

  * view (request, response) {
    const model = yield User.find(request.param('id'))

    if (model == null) {
      yield request.with({ error: 'Cannot find requested user' }).flash()

      response.route('dashboard.users')
      return
    }

    yield model.related('votes', 'votes.candidate', 'votes.candidate.category').load()

    yield response.sendView('dashboard/user/view', {
      model: model.toJSON()
    })
  }

}

module.exports = UserController
