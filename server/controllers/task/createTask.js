'use strict'

const models = require('../../models/index.js')

//Creates a task for a given event
//req should have: tasks: <array>{ name: <string>, description: <string>}
//res will have: {success: <boolean>}
const createTask = function(req, res) {

  if(!Array.isArray(req.body.tasks) || (req.body.tasks.length && !req.body.tasks[0].name))
    res.json({error: "tasks should be an array of {name, description}"}).status(200).end()
  else {
    const createTasks = req.body.tasks.map(task => (models.Task.create(task)))
    const getEvent = models.Event.findOne({ where: { id: req.event.id }})

    Promise.all([getEvent].concat(createTasks))
      .then(results => {
        const event = results[0]
        const tasks = results.slice(1)
        return event.setTasks(tasks)
      })
      .then(event => {
        res.json({success: true}).status(200).end()
      })
    }
}

module.exports = createTask
