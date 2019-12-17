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

  async getRentedGames ({params}) {
    const availableGames = await Database.select('user_games.id','user_id','game_id','available','region','time','console','offline','online','genre','images').from('user_games').where({'renter_id':params.id}).innerJoin('games', 'user_games.game_id', 'games.id')
    
    return availableGames
  }


  async getRentedPS4Games ({params}) {
    const availablePS4Games = await Database.select('user_games.id','user_id','game_id','available','region','time','console','offline','online','genre','images').from('user_games').where({'renter_id':params.id,'console':'PS4'}).innerJoin('games', 'user_games.game_id', 'games.id')
    return availablePS4Games
  }

  async getRentedXBOXGames ({params}) {

    const RentedXBOXGames = await Database.select('user_games.id','user_id','game_id','available','region','time','console','offline','online','genre','images').from('user_games').where({'renter_id':params.id,'console':'XBOX'}).innerJoin('games', 'user_games.game_id', 'games.id')
    return RentedXBOXGames
  }

}

module.exports = UserController