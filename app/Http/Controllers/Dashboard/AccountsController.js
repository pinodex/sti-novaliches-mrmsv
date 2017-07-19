'use strict'

/*!
 * STI College Novaliches
 * SEC Voting System Server
 *
 * Copyright 2017, Raphael Marco <raphaelmarco@outlook.com>
 */

const Account = use('App/Model/Account')
const Validator = use('Validator')

class AccountsController {
  * index (request, response) {
    const accounts = yield Account.all()

    yield response.sendView('dashboard/accounts/index', {
      accounts: accounts
    })
  }

  * edit (request, response) {
    const paramId = request.param('id')
    let account = new Account()

    if (paramId) {
      account = yield Account.find(paramId)
    }

    if (account == null) {
      yield request.with({ error: 'Cannot find requested account' }).flash()

      response.route('dashboard.accounts')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only([
        'name',
        'username',
        'password',
        'password_confirm',
      ])

      const validation = yield Validator.validate(data, Account.rules(account.id), Account.validationMessages)

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (account.id) {
          response.route('dashboard.accounts.edit', { id: account.id })
          return
        }

        response.route('dashboard.accounts.add')
        return
      }

      delete data['password_confirm']

      if (data['password'] == '') {
        delete data['password']
      }

      account.fill(data)

      yield account.save()
      yield request.with({ success: '`Changes to ${account.name} has been saved`' }).flash()

      response.route('dashboard.accounts')
      return
    }

    yield response.sendView('dashboard/accounts/edit', {
      account: account
    })
  }

  * delete (request, response) {
    const account = yield Account.find(request.param('id'))

    if (account == null) {
      yield request.with({ error: 'Cannot find requested account' }).flash()

      response.route('dashboard.accounts')
      return
    }

    if (request.method() == 'POST') {
      yield account.delete()
      yield request.with({ success: `${account.name} account has been deleted` }).flash()

      response.route('dashboard.accounts')
    }

    yield response.sendView('dashboard/accounts/delete', {
      account: account
    })
  }
}

module.exports = AccountsController
