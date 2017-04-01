'use strict'

const models = require('../models/index.js')

const findAll = function(req, res) {
    models.User.findAll()
    .then(users => {
      users = users.map(user => user.dataValues)
      res.json({user: users}).status(200).end()
    })
    .catch(err => res.status(500).end())
}

exports.user = {
  findAll: findAll
}
