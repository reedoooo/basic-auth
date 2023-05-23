'use strict'

// Import necessary modules
const { DataTypes } = require('sequelize'); // Import DataTypes from sequelize for model definitions
const bcrypt = require('bcrypt'); // Import bcrypt to hash passwords

// Define a function to generate a Users model
// The Sequelize instance is passed in as an argument
const Users = (sequelize) => {

  // Define the Users model
  let users = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // This will ensure usernames are unique across the model
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password is required
    }
  });

  // Define a hook to hash the password before creating a new user
  users.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  // Define a method to authenticate a user given a username and password
  users.authenticateUser = async (username, password) => {

    // Find a user record matching the given username
    let foundUser = await users.findOne({where: {username: username}});
    
    // If a user was found, compare the given password with the hashed password in the record
    let isAuthenticated = await bcrypt.compare(password, foundUser.password);

    // Return the user record if the password was correct, or throw an error otherwise
    if (isAuthenticated) {
      return foundUser;
    }
    else {
      throw new Error('Invalid credentials');
    }
  };

  // Return the Users model
  return users;
};

// Export the Users model generator function
module.exports = Users;
