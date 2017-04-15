'use strict'

const fs = require('fs')
const path = require('path')

const event = require('./event/index.js')
const user = require('./user/index.js')
const task = require('./task/index.js')


fs
  .readdirSync(__dirname).forEach(dirname => {console.log('dirname: ', dirname)})
  
module.exports = {
  event,
  user,
  task
}
