'use strict'

const Category = use('App/Model/Category')

class MainController {
  * index (request, response) {
    const categories = Category.with('candidates').fetch()

    yield response.sendView('index', { categories })
  }
}

module.exports = MainController
