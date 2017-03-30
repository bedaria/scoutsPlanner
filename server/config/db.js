const Sequelize = require('sequelize')
const db_uri = require('./config.js').db_uri
const DBconnection = new Sequelize(db_uri)

DBconnection
  .authenticate()
  .then(success => console.log("Sequelize connection to DB successfully established"))
  .catch(err => console.log("Error connecting to DB: ", err))

module.export = {
  DB: 'DBconnection'
}
