"use strict"

const User = use("App/Models/User")
const Database = use('Database')

class UserController {
  async create ({ request }) {
    const data = request.only(["username", "email", "password"])

    const user = await User.create(data)

    return user
  }
  
  /**
   * Display a single property.
   * GET properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showUser ({ params }) {
    const user = await User.findOrFail(params.id)

  
    return user
  }

  async getGames (request, response) {
    const userGames = await Database.from('user_games').where('user_id', request.params.id).innerJoin('games', 'user_games.game_id', 'games.id')

    return userGames

  }

}

module.exports = UserController