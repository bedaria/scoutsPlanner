'use strict'

const models = require('../../models/index.js')

//Finds all the users.
//INPUT:
//OUTPUT: <array> models.User.dataValues
const getAllUsers = function(req, res) {
    models.User.findAll()
    .then(users => {

      if(users)
        users = users.map(user => user.dataValues)

      res.json({users: users}).status(200).end()
    })
    .catch(err => {
      console.log("ERROR: ", err)
      res.status(500).end()
    })
}

module.exports = getAllUsers
