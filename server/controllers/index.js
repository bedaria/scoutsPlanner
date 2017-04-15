'use strict'

const fs = require('fs')
const path = require('path')

const getFileNames = (dirname, folder) => {
  fs
    .readdirSync(dirname)
    .forEach(name => {
      if(name.indexOf('.') === -1) {
        module.exports[name] = {}
        getFileNames(dirname + '/' + name, name)
      }
      else if(name !== 'index.js'){
        const fnName = name.slice(0, name.length-3)
        const toRequire = dirname + '/' + name
        module.exports[folder][fnName] = require(toRequire)
      }
    })
}

getFileNames(__dirname)
