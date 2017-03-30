const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/config.js').port
const DB = require('./config/db.js')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.set('port', port)

app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
