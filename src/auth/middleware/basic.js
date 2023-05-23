'use strict'

// Import necessary modules and models
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { usersModel } = require('../models/index')

const basicAuth = async (request, response, next) => {
  // Check if the headers contain authorization information
  if (!request.headers.authorization) {
    // Send a 401 error if authorization credentials are missing
    response.send(401).send('MISSING AUTHORIZATION CREDENTIALS');
    return;
  }

  // Split the authorization string to isolate the encoded username and password
  let encodedAuthorizationCredentials = request.headers.authorization.split(' ')[1];

  // Decode the username and password
  let decodedCredentials = base64.decode(encodedAuthorizationCredentials);

  // Separate the username and password from the decoded credentials
  let [decodedUserName, decodedPassword] = decodedCredentials.split(':');

  try {
    // Authenticate the user using the decoded credentials
    request.user = await usersModel.authenticateUser(decodedUserName, decodedPassword);

    // Proceed to the next middleware if authentication is successful
    next();
  } 
  catch (error) {
    // Forward the error to the error handling middleware if authentication fails
    next(error)
  }

}

// Export the basicAuth middleware function
module.exports = basicAuth;
