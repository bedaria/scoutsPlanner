'use strict'

const models = require('../../models/index.js')

//Creates a task for a given event
//req should have: tasks: <array>{ name: <string>, description: <string>}
//res will have: {success: <boolean>}
const createTask = function(req, res) {

  if(!Array.isArray(req.body.tasks) && !req.body.tasks[0].name)
    res.json({success: false, error: "Tasks should be an array of {name, description}"}).status(400).end()
  else {
    const createTasks = req.body.tasks.map(task => {
         return () => (models.Task.create(task))
      })

    const getEvent = () => (
      models.Event.findOne({
        where: {
          id: req.event.id
        }
      })
    )
    const promiseArray = [getEvent].concat(createTasks)

    Promise.all(promiseArray.map(promise => promise()))
      .then(results => {
        const event = results[0]
        const tasks = results.slice(1)
        // if(event.getTasks().length, concat new created tasks)
        return event.setTasks(tasks)
      })
      .then(event => {
        return event.getTasks()
      })
      .then(tasks => {
        res.json({success: true}).status(200).end()
      })
    }
}

module.exports = createTask
