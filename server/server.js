const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/config.js').port
const db = require('./models/index.js')
const event = require('./routes/event.js')
const authentication = require('./middleware/authentication.js')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/users/:name', authentication.isAuthenticated, event)
app.use('/admins/:name', authentication.isAdmin, event)

app.set('port', port)

db.sequelize.sync()
app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
