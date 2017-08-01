'use strict'

const Env = use('Env')
const Youch = use('youch')
const Http = exports = module.exports = {}

const path = require('path')

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  const status = error.status || 500

  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const youch = new Youch(error, request.request)
    const type = request.accepts('json', 'html')
    const formatMethod = type === 'json' ? 'toJSON' : 'toHTML'
    const formattedErrors = yield youch[formatMethod]()
    response.status(status).send(formattedErrors)
    return
  }

  if (error.name === 'InvalidLoginException') {
    response.route('dashboard.login')

    return
  }

  /**
   * PRODUCTION REPORTER
   */
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
  const Helpers = use('Helpers'),
        Config = use('Config'),
        Route = use('Route'),
        View = use('View')

  const manifest = require(path.join(Helpers.publicPath(), 'mix-manifest.json')),
        cdnBase = Env.get('CDN_BASE')

  View.global('url', (route, data) => {
    data = data || {}

    return Route.url(route, data)
  })

  View.global('route', (route, data) => {
    data = data || {}

    return Route.url(route, data)
  })

  View.global('config', key => {
    return Config.get(key)
  })

  View.global('storage', file => {
    return Helpers.storagePath(file)
  })

  View.global('mix', text => {
    if (!text) {
      return
    }

    if (Env.get('NODE_ENV') === 'production') {
      return `${cdnBase}${manifest[text]}`
    }

    return manifest[text]
  })

  View.global('asset', file => {
    if (Env.get('NODE_ENV') === 'production') {
      return `${cdnBase}${file}`
    }

    return file
  })
}
