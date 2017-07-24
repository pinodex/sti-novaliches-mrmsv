'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
  static rules (id) {
    return {
      name: 'required',
      is_active: 'required|in:0,1'
    }
  }

  static get validationMessages () {
    return {
      'name.required': 'Name field cannot be empty',
      'is_active.required': 'Active field cannot be empty',
      'is_active.in': 'Invalid active field value'
    }
  }

  candidates () {
    return this.hasMany('App/Model/Candidate')
  }

  getIsActive(value) {
    return value == 1
  }
}

module.exports = Category
