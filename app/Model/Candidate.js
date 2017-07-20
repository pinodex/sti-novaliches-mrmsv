'use strict'

const Lucid = use('Lucid')

class Candidate extends Lucid {
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

  category () {
    return this.belongsTo('App/Model/Category')
  }
}

module.exports = Candidate
