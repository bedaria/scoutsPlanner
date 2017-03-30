'use strict'

const dotenv = require('dotenv').config()

if(dotenv.error)
  throw new Error(`Can't find .env file in root path: ${dotenv.error}`)
else {
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
}
