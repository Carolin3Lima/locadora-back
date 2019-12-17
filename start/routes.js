'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')
Route.resource('properties', 'PropertyController')
  .apiOnly()
  .middleware('auth')

Route.get('/games/available','GamesController.getAvailableGames')
Route.get('/games/available/ps4','GamesController.getAvailablePS4Games')
Route.get('/games/available/xbox','GamesController.getAvailableXBOXGames')

Route.get('/games','GamesController.showAll')
//.middleware('auth')
Route.post('/games/add','GamesController.addUserGame')
Route.post('/games/rent','GamesController.rentGames')

Route.get('user/:id','UserController.showUser')
//.middleware('auth')
Route.post('/user/:id','UserController.show')
Route.get('user/games/:id','UserController.getGames')
Route.get('user/games/rented/:id','UserController.getRentedGames')
Route.get('user/games/rented/ps4/:id','UserController.getRentedPS4Games')
Route.get('user/games/rented/xbox/:id','UserController.getRentedXBOXGames')

Route.post('properties/:id/images', 'ImageController.store')
.middleware('auth')  
Route.get('images/:path', 'ImageController.show')