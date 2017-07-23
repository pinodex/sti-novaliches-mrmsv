'use strict'

module.exports = [
  {
    header: null,
    list: [
      {
        icon: 'home',
        identifier: 'home',
        route: 'dashboard.index',
        name: 'Home'
      },

      {
        icon: 'vcard',
        identifier: 'accounts',
        route: 'dashboard.accounts',
        name: 'Accounts'
      },

      {
        icon: 'folder',
        identifier: 'categories',
        route: 'dashboard.categories',
        name: 'Categories'
      },

      {
        icon: 'male',
        identifier: 'candidates',
        route: 'dashboard.candidates',
        name: 'Candidates'
      },

      {
        icon: 'users',
        identifier: 'users',
        route: 'dashboard.users',
        name: 'Users'
      }
    ]
  }
]
