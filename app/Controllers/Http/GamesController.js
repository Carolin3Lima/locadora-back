'use strict'
const Games = use('App/Models/Games')

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
}

module.exports = GamesController
