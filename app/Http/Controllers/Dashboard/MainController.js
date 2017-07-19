'use strict'

class MainController {
  * index (request, response) {
    yield response.sendView('dashboard/index')
  }

  * login (request, response) {
    if (request.method() == 'POST') {
      try {
        const auth = yield request.auth.attempt(
          request.input('username'),
          request.input('password')
        )
      } catch (e) {
        yield request.withOut('password').andWith({ error: 'Invalid username and/or password' }).flash()

        response.route('dashboard.login')
        return
      }

      response.route('dashboard.index')
      return
    }

    yield response.sendView('dashboard/login')
  }

  * logout (request, response) {
    yield request.auth.logout()

    response.route('dashboard.login')
  }
}

module.exports = MainController
