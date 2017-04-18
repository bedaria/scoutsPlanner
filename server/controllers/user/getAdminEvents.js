'use strict'

const models = require('../../models/index.js')

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
