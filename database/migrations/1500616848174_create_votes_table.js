'use strict'

const Schema = use('Schema')

class VotesTableSchema extends Schema {

  up () {
    this.create('votes', (table) => {
      table.integer('user_id')
      table.integer('candidate_id')
      table.timestamps()

      table.primary(['user_id', 'candidate_id'])
    })
  }

  down () {
    this.drop('votes')
  }

}

module.exports = VotesTableSchema
