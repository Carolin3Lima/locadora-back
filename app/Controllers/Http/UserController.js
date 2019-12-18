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

  async updateUser ({request, response}) {


    const data = request.only([
      'id',
      'username',
      'email',
      'address',
      'region',
      'time',
      'others',
      'cpf',
      'state',
      'city',
    ])
    const saveUser = await Database
    .table('users')
    .where('id', 1)
    .update(data)
    
    return saveUser
  }

  async getGames (request, response) {
    const userGames = await Database.select('user_games.id','user_id','game_id','available','user_games.region','user_games.time','console','offline','online','genre','images','users.username','users.email','users.cpf','users.address','users.others').from('user_games').where('user_id', request.params.id).innerJoin('games', 'user_games.game_id', 'games.id').leftJoin('users','user_games.renter_id','users.id')

    return userGames

  }

  async getRentedGames ({params}) {
    const availableGames = await Database.select('user_games.id','user_id','game_id','available','user_games.region','user_games.time','console','offline','online','genre','images','renter_id','users.username','users.email','users.cpf','games.name','users.address','users.others').from('user_games').where({'renter_id':params.id}).innerJoin('games', 'user_games.game_id', 'games.id').innerJoin('users','user_games.user_id','users.id')
    
    return availableGames
  }


  async getRentedPS4Games ({params}) {
    const availablePS4Games = await Database.select('user_games.id','user_id','game_id','available','user_games.region','user_games.time','console','offline','online','genre','images','renter_id','users.username','users.email','users.cpf','games.name','users.address','users.others').from('user_games').where({'renter_id':params.id,'console':'PS4'}).innerJoin('games', 'user_games.game_id', 'games.id').innerJoin('users','user_games.user_id','users.id')
    return availablePS4Games
  }

  async getRentedXBOXGames ({params}) {

    const RentedXBOXGames = await Database.select('user_games.id','user_id','game_id','available','user_games.region','user_games.time','console','offline','online','genre','images','renter_id','users.username','users.email','users.cpf','games.name','users.address','users.others').from('user_games').where({'renter_id':params.id,'console':'XBOX'}).innerJoin('games', 'user_games.game_id', 'games.id').innerJoin('users','user_games.user_id','users.id')
    return RentedXBOXGames
  }

}

module.exports = UserController