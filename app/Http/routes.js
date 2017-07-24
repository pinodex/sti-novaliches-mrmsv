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

Route
  .get('/', 'MainController.index')
  .as('index')

Route
  .post('/vote', 'MainController.vote')
  .as('vote')
  .middleware('auth:user')

Route.group('auth', () => {

  Route
    .post('/login', 'AuthController.login')
    .as('auth.login')

  Route
    .get('/logout', 'AuthController.logout')
    .as('auth.logout')

}).prefix('auth')

Route.group('dashboard', () => {

  Route
    .get('/', 'Dashboard/MainController.index')
    .as('dashboard.index')
    .middleware('auth:account')

  Route
    .route('login', ['GET', 'POST'], 'Dashboard/MainController.login')
    .as('dashboard.login')

  Route
    .get('logout', 'Dashboard/MainController.logout')
    .as('dashboard.logout')
    .middleware('auth:account')

})
.prefix('dashboard')

/**
 * Accounts
 */
Route.group('dashboard.accounts', () => {

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
.middleware('auth:account')

/**
 * Categories
 */
Route.group('dashboard.categories', () => {

  Route
    .get('/', 'Dashboard/CategoryController.index')
    .as('dashboard.categories')

  Route
    .post('/emit-update', 'Dashboard/CategoryController.emitUpdate')
    .as('dashboard.categories.emit_update')

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
.middleware('auth:account')

/**
 * Candidates
 */
Route.group('dashboard.candidates', () => {

  Route
    .get('/', 'Dashboard/CandidateController.index')
    .as('dashboard.candidates')

  Route
    .post('/emit-update', 'Dashboard/CandidateController.emitUpdate')
    .as('dashboard.candidates.emit_update')

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
.middleware('auth:account')

/**
 * Users
 */
Route.group('dashboard.users', () => {

  Route
    .get('/', 'Dashboard/UserController.index')
    .as('dashboard.users')

  Route
    .get('/:id', 'Dashboard/UserController.view')
    .as('dashboard.users.view')

})
.prefix('dashboard/users')
.middleware('auth:account')
