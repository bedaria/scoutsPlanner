'use strict'

const router = require('express').Router()
const controllers = require('../../controllers/index.js')

router.post('/tasks', controllers.task.createTask)

module.exports = router