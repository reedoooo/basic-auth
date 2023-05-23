'use strict'

// Import necessary modules and libraries
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize'); // Import Sequelize ORM

// Define connection string, defaulting to in-memory database for lack of a defined DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

// Import user model schema
const users = require('./users-model');

// Create a Sequelize instance using the connection string
const sequelize = new Sequelize(DATABASE_URL);

// Define the user model with our Sequelize instance
const usersModel = users(sequelize);

// Below code is currently commented out. If uncommented, it would hash passwords before creating user entries in the database
// usersModel.beforeCreate(async user => {
//   user.password = await bcrypt.hash(user.password, 10);
// })

// Export sequelize instance and defined models for further use
module.exports = {
  sequelize,
  usersModel,
}
