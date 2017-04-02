'use strict'

const fs = require('fs')
const path = require('path')

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    const name = file.slice(0, file.length-3)
    const toRequire = './' + file
    module.exports[name] = require(toRequire)
  })
