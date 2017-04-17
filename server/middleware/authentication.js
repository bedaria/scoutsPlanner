const models = require('../models/index.js')
const jwt = require('jsonwebtoken')

const authenticate =  function (req, res, next) {
  const token = req.headers['x-access-token']
  if(token) {
    jwt.verify(token, 'copperAndFrankie', function(err, decoded) {
      if(err)
        return res.json({success: false, message: 'Failed to authenticate token.'})
      else {
        req.user = {
          name: decoded.username,
          id: decoded.id
        }
        next()
      }
    })
  }
  else
    return res.status(403).send({success: false, message: 'No token provided.'})
}

module.exports = authenticate
