const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/config.js').port
const db = require('./models/index.js')
const adminRoutes = require('./routes/admin.js')
const standardRoutes = require('./routes/standard.js')
const fakeLogin = require('./fakeLogin.js')
const tempRoutes = require('./temp/tempRoutes.js')
const authenticate = require('./middleware/authentication.js')

const app = express()

app.use(express.static(path.join('./client')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/admin', authenticate, adminRoutes)
app.use('/', authenticate, standardRoutes)
app.use('/fakeAnswers', tempRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).end()
})

app.post('/login', fakeLogin)
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.set('port', port)

db.sequelize.sync()
// require('./testDatabase.js')
app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
