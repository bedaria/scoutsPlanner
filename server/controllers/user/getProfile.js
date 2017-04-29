'use strict'
const models = require('../../models/index.js')

//Needs user id
const getProfile = (req, res, next) => {
  models.User.findOne({
    where: {
      id: req.user.id
    }
  })
  .then(user => {
    res.json({status: "success", profileInfo: user.dataValues}).status(200).end()
  })
  .catch(err => next(err))
}

module.exports = getProfile
