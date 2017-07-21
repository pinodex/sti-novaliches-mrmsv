'use strict'

const Lucid = use('Lucid')

class Vote extends Lucid {
  student () {
    return this.belongsTo('App/Model/Student')
  }

  candidate () {
    return this.belongsTo('App/Model/Candidate')
  }
}

module.exports = Vote
