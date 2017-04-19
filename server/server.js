const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/config.js').port
const db = require('./models/index.js')
const routes = require('./routes.js')
const fakeLogin = require('./fakeLogin.js')
const tempRoutes = require('./temp/tempRoutes.js')
const authenticate = require('./middleware/authentication.js')

const app = express()

app.use(express.static(path.join('./client')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())


app.post('/login', fakeLogin)
app.use('/fakeAnswers', tempRoutes)
app.use('/', authenticate, routes)


app.use((err, req, res, next) => {
  console.error(err, err.stack)
  res.status(500).end()
})


app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.set('port', port)

// db.sequelize.sync({force: true})
//   .then(success => {
//    require('./fakeUsers.js')
// })
db.sequelize.sync()
app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
