'use strict'

const models = require('../../models/index.js')

//Returns all of the events a user created.
//NEED user id (from authentication)
//res will have:
//  adminEvents: <array< {
//                id <number>,
//                name <string>}>>
const getAdminEvents = (req, res) => {
  models.Event.findAll({
    where: { mainAdminId: req.user.id },
    attributes: ['id', 'name']
  })
  .then(adminEvents => {
     res.json({success: true, adminEvents}).status(200).end()
  })
}

module.exports = getAdminEvents
