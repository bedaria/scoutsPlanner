const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/config.js').port
const db = require('./models/index.js')
const authentication = require('./middleware/authentication.js')
const routes = require('./routes/index.js')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/users/:name', authentication.isAuthenticated, routes.standard.event)
app.use('/users/admin/:name', authentication.isAdmin, routes.admin.event)
app.use('/users/admin/', authentication.isAdmin, routes.admin.user)
app.set('port', port)

// db.sequelize.sync({force: true})
// require('./testDatabase.js')
app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
