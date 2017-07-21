'use strict'

const Env = use('Env')

module.exports = {
  app_id: Env.get('FACEBOOK_APP_ID'),
  app_secret: Env.get('FACEBOOK_APP_SECRET')
}
