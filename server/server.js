const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = require('./config/config.js').port
const db = require('./models/index.js')
const routes = require('./routes.js')
const fakeLogin = require('./temp/fakeLogin.js')
const tempRoutes = require('./temp/tempRoutes.js')
const authorize = require('./middleware/authorization.js')

const app = express()
app.use((req, res, next) => {
  console.log("got: ", req.url)
  next()
})
app.use(express.static(path.join(__dirname, '/../client')))
app.use('/profile/picture', express.static(path.join(__dirname, 'profile_pictures')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.post('/login', fakeLogin)
app.use('/fakeReplies', tempRoutes)
app.use('/api', authorize, routes)

//send back static files on reload
app.get('*', (req, res) => {
  const re = /dist\/bundle\.js$|style\.css$/
  const matched = req.url.match(re)

  if(matched)
    res.sendFile(path.join(__dirname, '/../client/', matched[0]))
  else
    res.sendFile(path.join(__dirname, '/../client/index.html'))
})

app.use((req, res, next) => {
  const err = new Error(`Not Found: ${req.url}`);
  err.status = 404;
  next(err);
})


app.use((err, req, res, next) => {
  console.log("err: ", err.message, err.stack)
  const message = [400, 404].indexOf(err.status) > -1 ? err.message: 'Sorry, server error...'
  res.status(err.status || 500).json({success: false, error: message})
})

app.set('port', port)

// db.sequelize.sync({force: true})
//   .then(success => {
//    require('./temp/populateDB.js')
//   })

db.sequelize.sync()
app.listen(app.get('port'), () =>
  console.log('Express server listening on port: ', app.get('port'))
)
