'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
  static rules (id) {
    return {
      name: 'required'
    }
  }

  static get validationMessages () {
    return {
      'name.required': 'Name field cannot be empty'
    }
  }

  candidates () {
    return this.hasMany('App/Model/Candidate')
  }
}

module.exports = Category
