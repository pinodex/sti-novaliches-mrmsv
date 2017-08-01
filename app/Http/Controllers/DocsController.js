'use strict'

class DocsController {
  * termsOfService (request, response) {
    yield response.sendView('docs/terms-of-service')
  }

  * privacyPolicy (request, response) {
    yield response.sendView('docs/privacy-policy')
  }
}

module.exports = DocsController
