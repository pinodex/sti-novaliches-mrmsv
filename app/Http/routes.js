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

/**
 * Accounts
 */
Route.group('dashboard.accounts', function () {

  Route
    .get('/', 'Dashboard/AccountController.index')
    .as('dashboard.accounts')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/AccountController.edit')
    .as('dashboard.accounts.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/AccountController.edit')
    .as('dashboard.accounts.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/AccountController.delete')
    .as('dashboard.accounts.delete')

})
.prefix('dashboard/accounts')
.middleware('auth')

/**
 * Categories
 */
Route.group('dashboard.categories', function () {

  Route
    .get('/', 'Dashboard/CategoryController.index')
    .as('dashboard.categories')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/CategoryController.edit')
    .as('dashboard.categories.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/CategoryController.edit')
    .as('dashboard.categories.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/CategoryController.delete')
    .as('dashboard.categories.delete')

})
.prefix('dashboard/categories')
.middleware('auth')

/**
 * Candidates
 */
Route.group('dashboard.candidates', function () {

  Route
    .get('/', 'Dashboard/CandidateController.index')
    .as('dashboard.candidates')

  Route
    .route('add', ['GET', 'POST'], 'Dashboard/CandidateController.edit')
    .as('dashboard.candidates.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Dashboard/CandidateController.edit')
    .as('dashboard.candidates.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Dashboard/CandidateController.delete')
    .as('dashboard.candidates.delete')

})
.prefix('dashboard/candidates')
.middleware('auth')
