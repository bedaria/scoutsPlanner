'use strict'

const Sequelize = require('sequelize')
const db_uri = require('../config/config.js').db_uri
const sequelize = new Sequelize(db_uri, {logging: false})
const fs = require('fs')
const path = require('path')
var db = {}

sequelize
  .authenticate()
  .then(success => console.log("Sequelize connection to DB successfully established"))
  .catch(err => console.log("Error connecting to DB: ",err))

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if("associate" in db[modelName])
    db[modelName].associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
