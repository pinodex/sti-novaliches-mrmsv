'use strict'

const Schema = use('Schema')

class CandidatesTableSchema extends Schema {

  up () {
    this.create('candidates', (table) => {
      table.increments('id').notNullable()
      table.integer('category_id', 10)
      table.string('name').notNullable()
      table.string('thumb_path')
      table.string('picture_path')
      table.timestamps()
    })
  }

  down () {
    this.drop('candidates')
  }

}

module.exports = CandidatesTableSchema
