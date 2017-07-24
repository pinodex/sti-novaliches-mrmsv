'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const VoteResult = use('App/Components/VoteResult'),
      Candidate = use('App/Model/Candidate'),
      Category = use('App/Model/Category'),
      Validator = use('Validator'),
      Helpers = use('Helpers'),
      Event = use('Event')

const Jimp = require('jimp'),
      slug = require('limax')

class CandidateController {
  * index (request, response) {
    const candidates = yield Candidate.query().with('category', 'votes').fetch()

    yield response.sendView('dashboard/candidate/index', {
      result: candidates
    })
  }

  * emitUpdate (request, response) {
    const candidates = yield VoteResult.get()

    Event.fire('candidates.update', candidates)

    response.status(204).send()
  }

  * edit (request, response) {
    const categories = yield Category.all()

    const paramId = request.param('id')
    let model = new Candidate()

    if (paramId) {
      model = yield Candidate.find(paramId)
    }

    if (model == null) {
      yield request.with({ error: 'Cannot find requested candidate' }).flash()

      response.route('dashboard.candidates')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only(['name', 'category_id'])

      const validation = yield Validator.validate(data, Candidate.rules(model.id), Candidate.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (model.id) {
          response.route('dashboard.candidates.edit', { id: model.id })
          return
        }

        response.route('dashboard.candidates.add')
        return
      }

      model.fill(data)

      const picture = request.file('picture', {
        maxSize: '2mb',
        allowedExtensions: ['jpg', 'png', 'jpeg']
      })

      const baseName = `${slug(model.name)}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`,
            pictureName = `${baseName}-picture.jpg`,
            thumbName = `${baseName}-thumb.jpg`

      Jimp.read(picture.tmpPath())
        .then(image => {
          image.resize(512, 512).quality(90).write(`${Helpers.storagePath()}/public/${pictureName}`)
          image.resize(128, 128).quality(75).write(`${Helpers.storagePath()}/public/${thumbName}`)
        })

      model.picture_path = pictureName
      model.thumb_path = thumbName

      yield model.save()
      yield request.with({ success: `Changes to ${model.name} has been saved` }).flash()

      response.route('dashboard.candidates')
      return
    }

    yield response.sendView('dashboard/candidate/edit', { model, categories })
  }

  * delete (request, response) {
    const model = yield Candidate.find(request.param('id'))

    if (model == null) {
      yield request.with({ error: 'Cannot find requested candidate' }).flash()

      response.route('dashboard.candidates')
      return
    }

    if (request.method() == 'POST') {
      yield model.delete()
      yield request.with({ success: `${model.name} candidate has been deleted` }).flash()

      response.route('dashboard.candidates')
    }

    yield response.sendView('dashboard/candidate/delete', { model })
  }
}

module.exports = CandidateController
