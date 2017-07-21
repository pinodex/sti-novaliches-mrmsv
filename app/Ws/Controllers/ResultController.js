'use strict'

const Category = use('App/Model/Category')

class ResultController {

  constructor (socket) {
    this.socket = socket
  }

  * onUpdate () {
    const categories = yield Category.with('candidates').fetch()
    let output = []

    categories.each(category => {
      output.push(category.toJSON())
    })

    this.socket.toMe().emit('data', output)
  }

}

module.exports = ResultController
