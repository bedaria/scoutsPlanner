const models = require('../models/index.js')

const fakeLogin = (req, res) => {
  models.User.findAll({attributes: ['name']})
  .then(users => {
     const userIdx = getRandomNumberBetween(0, users.length)
     console.log("got userIdx: ", userIdx)
     console.log("You are logged in as: ", users[userIdx].dataValues.name)
     res.json({'username': users[userIdx].dataValues.name}).status(200).end()
  })
  .catch(error => {
    console.log("ERROR: ", error)
    console.log(error.stack)
    res.end()
  })
}

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random()* (max-min)) + min
}

module.exports = fakeLogin
