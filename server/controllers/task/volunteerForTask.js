'use strict'

const models = require('../../models/index.js')

//req needs: task: {name, id}
//res will have: {success: <boolean>}
const volunteerForTask = function(req, res) {

  const findUser = models.User.findOne({ where: { id: req.user.id }})
  const findTask = models.Task.findOne({ where: { id: req.body.taskId }})

  Promise.all([findUser, findTask])
    .then(results => {
      const user = results[0]
      const task = results[1]

      return user.addTask(task)
    })
    .then(success => res.json({success: true}).status(200).end)
    .catch(err => {
      console.log(__filename, " ERROR: ", err)
      res.status(500).end()
    })
}

module.exports = volunteerForTask
