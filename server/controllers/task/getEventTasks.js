'use strict'

const models = require('../../models/index.js')

//Returns all of the Tasks for a given event.
//res will have: tasks: <array> {id, name}
const getEventTasks = function(req, res) {

  models.Event.findOne({
    where: {
      id: req.event.id
    }
  })
  .then(event => event.getTasks({attributes: ['id', 'name']}))
  .then(tasks => {
    tasks = tasks.map(task => task.dataValues)
    res.json({succes: true, tasks: tasks}).status(200).end()
  })
}

module.exports = getEventTasks
