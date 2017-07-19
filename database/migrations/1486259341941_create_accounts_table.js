'use strict'

const Schema = use('Schema')

class AccountsTableSchema extends Schema {

  up () {
    this.create('accounts', (table) => {
      table.increments('id')
      table.string('name')
      table.string('username').unique()
      table.string('password', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('accounts')
  }

}

module.exports = AccountsTableSchema
