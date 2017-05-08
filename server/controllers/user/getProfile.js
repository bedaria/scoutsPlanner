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
    res.status(200).json({status: "success", profileInfo: user.dataValues})
  })
  .catch(err => { next(err) })
}

module.exports = getProfile
