const models = require('../models/index.js')
const jwt = require('jsonwebtoken')

const isAuthenticated =  function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  console.log("req: ", req.body)
  console.log("req: ", req.query)
  console.log("req: ", req.headers)
  if(token) {
    jwt.verify(token, 'copperAndFrankie', function(err, decoded) {
      if(err)
        return res.json({success: false, message: 'Failed to authenticate token.'})
      else {
        req.user = {}
        req.user.name = decoded.username
        req.user.id = decoded.id
        next()
      }
    })
  }
  else
    return res.status(403).send({success: false, message: 'No token provided.'})
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
