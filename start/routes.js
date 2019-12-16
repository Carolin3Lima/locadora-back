'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')
Route.resource('properties', 'PropertyController')
  .apiOnly()
  .middleware('auth')

Route.get('/games','GamesController.showAll')
//.middleware('auth')
Route.post('/games/add','GamesController.addUserGame')

Route.get('user/:id','UserController.showUser')
//.middleware('auth')
Route.post('/user/:id','UserController.show')
Route.get('user/games/:id','UserController.getGames')


Route.post('properties/:id/images', 'ImageController.store')
.middleware('auth')  
Route.get('images/:path', 'ImageController.show')