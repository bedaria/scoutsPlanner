'use strict'

const models = require('../../models/index.js')

//Adds user to a task
//NEED user id (from router.param)
//req needs {taskId<integer>}
//res will have: {success: <boolean>}
const volunteerForTask = function(req, res) {

  const findUser = () => (
    models.User.findOne({
      where: {
        id: req.user.id
      }
    })
  )
  const findTask = () => (
    models.Task.findOne({
      where: {
        id: req.body.taskId
      }
    })
  )

  Promise.all([findUser(), findTask()])
    .then(results => {
      const user = results[0]
      const task = results[1]

      return user.addTask(task)
    })
    .then(success => res.status(200).json({success: true}))
}

module.exports = volunteerForTask
