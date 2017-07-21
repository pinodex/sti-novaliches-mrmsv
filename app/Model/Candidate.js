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

  votes () {
    return this.hasMany('App/Model/Vote')
  }
}

module.exports = Candidate
