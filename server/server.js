const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/config.js').port
const db = require('./models/index.js')
const authentication = require('./middleware/authentication.js')
const saveEventId = require('./middleware/saveEventId.js')
const routes = require('./routes/index.js')

const app = express()

app.use(express.static(path.join('./client')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/users/:name', authentication.isAuthenticated, routes.standard.event)
app.use('/users/:name', authentication.isAuthenticated, routes.standard.task)
app.use('/events/:event', saveEventId, routes.standard.task)
app.use('/users/admin/', authentication.isAdmin, routes.admin.user)
app.use('/users/admin/:name', authentication.isAdmin, routes.admin.event)
app.use('/users/admin/:name/events/:event', saveEventId, routes.admin.task )
app.use('/users/:user/events/:event', saveEventId, routes.standard.task)

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).end()
// })

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.set('port', port)

db.sequelize.sync()
// require('./testDatabase.js')
app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
