'use strict'

const fs = require('fs')
const path = require('path')

const event = require('./event/index.js')
const user = require('./user/index.js')
const task = require('./task/index.js')

module.exports = {
  event,
  user,
  task
}
