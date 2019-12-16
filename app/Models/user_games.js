'use strict'

const Model = use('Model')
const Database = use('Database')

class User_Games extends Model {

  user () {
    return this.belongsTo('App/Models/User')
  }

}

module.exports = User_Games