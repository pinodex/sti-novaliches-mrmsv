'use strict'

const Schema = use('Schema')

class CandidatesTableSchema extends Schema {

  up () {
    this.create('candidates', (table) => {
      table.increments('id')
      table.integer('category_id')
      table.string('name')
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
