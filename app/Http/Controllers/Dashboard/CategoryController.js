'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Category = use('App/Model/Category')
const Validator = use('Validator')

class CategoryController {
  * index (request, response) {
    const categories = yield Category.all()

    yield response.sendView('dashboard/category/index', {
      result: categories
    })
  }

  * edit (request, response) {
    const paramId = request.param('id')
    let model = new Category()

    if (paramId) {
      model = yield Category.find(paramId)
    }

    if (model == null) {
      yield request.with({ error: 'Cannot find requested category' }).flash()

      response.route('dashboard.categories')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only([
        'name',
        'is_active'
      ])

      const validation = yield Validator.validate(data, Category.rules(model.id), Category.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (model.id) {
          response.route('dashboard.categories.edit', { id: model.id })
          return
        }

        response.route('dashboard.categories.add')
        return
      }

      delete data['password_confirm']

      if (data['password'] == '') {
        delete data['password']
      }

      model.fill(data)

      yield model.save()
      yield request.with({ success: `Changes to ${model.name} has been saved` }).flash()

      response.route('dashboard.categories')
      return
    }

    yield response.sendView('dashboard/category/edit', { model })
  }

  * delete (request, response) {
    const model = yield Category.find(request.param('id'))

    if (model == null) {
      yield request.with({ error: 'Cannot find requested category' }).flash()

      response.route('dashboard.categories')
      return
    }

    if (request.method() == 'POST') {
      yield model.delete()
      yield request.with({ success: `${model.name} category has been deleted` }).flash()

      response.route('dashboard.categories')
    }

    yield response.sendView('dashboard/category/delete', { model })
  }
}

module.exports = CategoryController
