'use strict'

const Lucid = use('Lucid')
const Vote = use('App/Model/Vote')
const Category = use('App/Model/Category')
const Candidate = use('App/Model/Candidate')

class User extends Lucid {
  votes () {
    return this.hasMany('App/Model/Vote')
  }
}

module.exports = User
