'use strict'

const co = require('co')
const fb = use('App/Addons/Facebook')
const User = use('App/Model/User')

class AuthController {
  * index (request, response) {

  }

  * login (request, response) {
    fb.options({
      accessToken: request.input('access_token')
    })

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
          let user = yield User.query().where('facebook_id', res.id).first()

          if (!user) {
            user = new User()
          }

          user.facebook_id = res.id
          user.picture_url = res.picture.data.url
          user.name = res.name

          yield user.save()
        })

        response.send({
          user: res
        })
      })
  }

  * logout (request, response) {

  }
}

module.exports = AuthController
