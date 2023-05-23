'use strict'

// Import necessary modules for testing
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const base64 = require('base-64');
const { sequelize, usersModel } = require('../src/auth/models/index');

// Before all tests, sync the sequelize instance to the database
beforeAll(async() => {
  await sequelize.sync();
});

// After all tests, drop all tables associated with the sequelize instance from the database
afterAll(async() => {
  await sequelize.drop();
});

// Tests for server responses to different request scenarios
describe('Testing if server handles requests properly', () => {

  // Test for a successful signup request
  test('Should send a 201 on successful POST to /signup', async () => {
    let req = {
      username: 'reedvogt_user',
      password: 'Olivervogt1'
    }
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(201);
  })

  // Test for a successful signin request
  test('Should send a 200 on a successful POST to /signin', async () => {
    const response = await request.post('/signin').set('Authorization', `Basic ${base64.encode(`reedvogt_user:Olivervogt1`)}`);
    expect(response.status).toEqual(200);
  })

  // Test for signup request with missing password
  test('Should FAIL on POST to /signup with no password', async () => {
    let req = {
      username: 'reedvogt_user',
    }
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(403);
  })

  // Test for signup request with missing username
  test('Should FAIL on POST to /signup with no username', async () => {
    let req = {
      password: 'Olivervogt1'
    }
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(403);
  })

  // Test for signup request with empty body
  test('Should FAIL on POST to /signup with no body', async () => {
    let req = {}
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(403);
  })

  // Test for signin request with invalid credentials
  test('Should FAIL on POST to /signin with invalid credentials', async () => {
    const response = await request.post('/signin').set('Authorization', `Basic ${base64.encode(`reedvogt_user:Olivervogt123`)}`);
    expect(response.status).toEqual(500);
  })

})
