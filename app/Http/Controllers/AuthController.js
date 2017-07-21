'use strict'

const User = use('App/Model/User'),
      UserTransformer = use('App/Components/UserTransformer'),
      fb = use('App/Addons/Facebook'),
      co = require('co')

class AuthController {

  * login (request, response) {
    fb.options({ accessToken: request.input('access_token') })

    fb.api('/me', { fields: ['id', 'name', 'picture', 'verified'] })
      .then(res => {
        if (!res.verified) {
          response.send({
            error: {
              message: 'Your Facebook account is not verified'
            }
          })

          return
        }

        co(function* () {
          const props = {
            fbid: res.id,
            name: res.name,
            avatar: res.picture.data.url
          }

          const user = yield User.findOrCreate({ fbid: res.id }, props)

          yield user.related('votes').load()

          user.fill(props)

          yield user.save()
          yield request.auth
            .authenticator('user')
            .loginViaId(user.id)

          response.send({ user: yield UserTransformer.transform(user) })
      })
    })
  }

  * logout (request, response) {
    yield request.auth.authenticator('user').logout()

    response.status(204).send()
  }
}

module.exports = AuthController
