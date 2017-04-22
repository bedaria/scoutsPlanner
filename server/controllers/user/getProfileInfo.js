'use strict'
const models = require('../../models/index.js')

//Needs user id
const getProfileInfo = (req, res) => {
  models.User.findOne({
    where: {
      id: req.user.id
    }
  })
  .then(user => {
    res.json({status: "success", profileInfo: user.dataValues}).status(200).end()
  })
}

module.exports = getProfileInfo
