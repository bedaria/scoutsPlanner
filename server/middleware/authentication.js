const models = require('../models/index.js')

const isAuthenticated =  function (req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  models.User.findOne({where: {
    name: req.params.name
    },
    attributes: ['id']
  })
  .then(user => {
    req.user.id = user.dataValues.id
    next()
  })
}

const isAdmin = function(req, res, next) {
  req.user = {}
  req.user.name = req.params.name
  models.User.findOne({where: {
    name: req.params.name
  },
    attributes: ['id']
  })
  .then(user => {
    req.user.id = user.dataValues.id
    next()
  })
}

module.exports = {
  isAuthenticated,
  isAdmin
}
