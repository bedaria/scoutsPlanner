'use strict'

const router = require('express').Router()
const controllers = require('../../controllers/index.js')

router.get('/tasks', controllers.task.getEventTasks)
router.post('/tasks', controllers.task.volunteerForTask)

module.exports = router
