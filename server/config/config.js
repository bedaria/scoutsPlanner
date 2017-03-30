'use strict'

require('dotenv').config()

const environmentVariables = ['DB_URI']
environmentVariables.forEach(name => {
  if(!process.env[name])
    throw new Error(`Environment variable ${name} is missing`)
})

const port = process.env.PORT || 3000

const config = {
  db_uri: process.env.DB_URI,
  port: port
}

module.exports = config
