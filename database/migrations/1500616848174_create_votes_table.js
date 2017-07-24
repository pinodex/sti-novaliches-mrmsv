'use strict'

const Schema = use('Schema')

class VotesTableSchema extends Schema {

  up () {
    this.create('votes', (table) => {
      table.integer('user_id', 10).notNullable()
      table.integer('candidate_id', 10).notNullable()
      table.timestamps()

      table.primary(['user_id', 'candidate_id'])
    })
  }

  down () {
    this.drop('votes')
  }

}

module.exports = VotesTableSchema
