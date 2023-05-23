'use strict'

const express = require('express');
const app = express();
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const cors = require('cors');
// const basicAuth = require('./auth/middleware/basic')
const router = require('./auth/router')

// Allows us to 'talk' to other websites
app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


app.use(router)


module.exports = {
  app,
  // make sure our tables are created, start up the HTTP server.
  start: (PORT) => app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
  })
}