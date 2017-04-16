'use strict'

const models = require('../../models/index.js')

//Finds all the users.
//resp wil lhave: <array> models.User.dataValues
const getAllUsers = (req, res) => {
    models.User.findAll({
      attributes: ['name', 'id']
    })
    .then(users => {

      if(users)
        users = users.map(user => user.dataValues)

      res.json({users: users}).status(200).end()
    })
}

module.exports = getAllUsers
