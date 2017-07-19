'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.group('dashboard', function () {

  Route
    .get('/', 'Dashboard/MainController.index')
    .as('dashboard.index')
    .middleware('auth')

  Route
    .route('login', ['GET', 'POST'], 'Dashboard/MainController.login')
    .as('dashboard.login')

  Route
    .get('logout', 'Dashboard/MainController.logout')
    .as('dashboard.logout')
    .middleware('auth')

})
.prefix('dashboard')

Route.group('dashboard.accounts', function () {

  Route
    .get('/', 'Dashboard/AccountsController.index')
    .as('dashboard.accounts')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/AccountsController.edit')
    .as('dashboard.accounts.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/AccountsController.edit')
    .as('dashboard.accounts.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/AccountsController.delete')
    .as('dashboard.accounts.delete')

})
.prefix('dashboard/accounts')
.middleware('auth')
