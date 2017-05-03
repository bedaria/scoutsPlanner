'use strict'

const models = require('../../models/index.js')

//Finds all the users.
//resp will have:
//        array<{id <number>, name <string> }>
const getAllUsers = (req, res, next) => {
    models.User.findAll({
      attributes: ['name', 'id']
    })
    .then(users => {

      if(users)
        users = users.map(user => user.dataValues)

      res.status(200).json({users: users})
    })
    .catch(err => next(err))
}

module.exports = getAllUsers
