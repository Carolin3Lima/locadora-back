'use strict'
const Games = use('App/Models/Games')
const UserGames = use('App/Models/user_games')
const Database = use('Database')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


class GamesController {


  /**
   * Display all games.
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showAll () {
    const games = await Games.all()
   
    return games
  }

   /**
   * Create/save a new property.
   * POST properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async getAvailableGames (request, response) {
    const availableGames = await Database.select('user_games.id','user_id','game_id','available','region','time','console','offline','online','genre','images').from('user_games').where({'available':1}).innerJoin('games', 'user_games.game_id', 'games.id')
    
    return availableGames
  }


  async getAvailablePS4Games (request, response) {
    const availablePS4Games = await Database.select('user_games.id','user_id','game_id','available','region','time','console','offline','online','genre','images').from('user_games').where({'available':1,'console':'PS4'}).innerJoin('games', 'user_games.game_id', 'games.id')
    return availablePS4Games
  }

  async getAvailableXBOXGames (request, response) {
    const AvailableXBOXGames = await Database.select('user_games.id','user_id','game_id','available','region','time','console','offline','online','genre','images').from('user_games').where({'available':1,'console':'XBOX'}).innerJoin('games', 'user_games.game_id', 'games.id')
    return AvailableXBOXGames
  }

  async rentGames ({request, response}) {
    const data = request.only([
      'renter_id',
      'id',
      'available'
    ])
    const rentedGame = await Database
    .table('user_games')
    .where('id', data.id)
    .update({ available: data.available, renter_id: data.renter_id })
    
    return rentedGame
  }

 /**
   * Create/save a new property.
   * POST properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async addUserGame ({ auth, request, response }) {
    //const { id } = auth.user
    const data = request.only([
      'user_id',
      'game_id',
      'available',
      'region',
      'time',
      'price'
    ])
    console.log(data)
  
    const userGame = await UserGames.create({ ...data })
  
    return userGame
  }



  
}



module.exports = GamesController
