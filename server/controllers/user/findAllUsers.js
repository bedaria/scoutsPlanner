'use strict'

const models = require('../../models/index.js')

//Finds all the users we have
//INPUT:
//OUTPUT: <array> models.User
const findAllUsers = function(req, res) {
    models.User.findAll()
    .then(users => {

      if(users)
        users = users.map(user => user.dataValues)

      res.json({user: users}).status(200).end()
    })
    .catch(err => {
      console.log("ERROR: ", err)
      res.status(500).end()
    })
}

module.exports = findAllUsers
