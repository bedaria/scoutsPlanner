'use strict'

const models = require('../../models/index.js')

const getAdminEvents = (req, res) => {
  models.Event.findAll({
    where: { mainAdminId: req.user.id },
    attributes: ['id', 'name']
  })
  .then(adminEvents => {
    if(adminEvents.length)
      adminEvents = adminEvents.map(event => (
        {
          id: event.dataValues.id,
          name: event.dataValues.name
        }
      ))

     res.json({success: true, adminEvents}).status(200).end()
  })
}

module.exports = getAdminEvents
