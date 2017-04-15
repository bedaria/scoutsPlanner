const models = require('./models/index.js')
const jwt = require('jsonwebtoken')

const fakeLogin = (req, res) => {
  models.User.findAll({attributes: ['name']})
  .then(users => {
     const idx = getRandomNumberBetween(0, users.length)
     const username = users[idx].dataValues.name
     const id = users[idx].dataValues.id
     const token = jwt.sign({username, id}, 'copperAndFrankie')

     res.json({username, token}).status(200).end()
  })
}

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random()* (max-min)) + min
}

module.exports = fakeLogin
