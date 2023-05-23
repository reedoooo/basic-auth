'use strict'

require('dotenv').config();
const server = require('./src/server');
const { sequelize } = require('./src/auth/models/index') // import db models

sequelize.sync()
.then( () => {
  server.start(process.env.PORT)
})
.catch(error => {
  console.error(`SQL CONNECT ERROR: `, error)
})