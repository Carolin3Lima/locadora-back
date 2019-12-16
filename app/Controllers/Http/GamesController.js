'use strict'
const Games = use('App/Models/Games')
const UserGames = use('App/Models/user_games')

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
