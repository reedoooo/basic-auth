'use strict'

// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt');

// Import user model and basic authentication middleware
const { usersModel } = require('./models/index');
const basicAuth = require('./middleware/basic');

// Initialize a router instance
const router = express.Router();

// Route to create a new user (Signup)
// Test this route with httpie in two ways:
// 1. echo '{"username":"john","password":"foo"}' | http post :3000/signup
// 2. http post :3000/signup username=john password=foo
router.post('/signup', async (req, res, next) => {
  try {
    // Password is automatically hashed by .beforeCreate() method in users model
    const record = await usersModel.create(req.body);
    res.status(201).json(record);
  } catch (e) { 
    // If there is an error while creating the user, respond with a 403 status code
    res.status(403).send('Error Creating User'); 
  }
});

// Route to authenticate a user (Signin)
// Test this route with httpie:
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, async (req, res) => {
  // Respond with the authenticated user details
  res.status(200).json({user: req.user})
})

// Export the router to be used in server.js or elsewhere
module.exports = router;
