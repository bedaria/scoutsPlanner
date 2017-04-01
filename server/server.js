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

app.use('/users/:name', authentication.isAuthenticated, routes.event)
app.use('/admins/:name', authentication.isAdmin, routes.event)

app.use('/', routes.user)

app.set('port', port)

db.sequelize.sync()
app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
