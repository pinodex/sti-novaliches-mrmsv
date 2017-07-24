'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
    this.create('categories', (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.boolean('is_active').defaultTo(false).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
