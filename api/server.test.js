// Write your tests here
//const request = require('supertest');
const db = require('../data/dbConfig');
//const server = require('./server');

test('sanity', () => {
  expect(true).toBe(true)
})
beforeAll( async ()=> {
  await db.migrate.rollback()
  await db.migrate.latest()
})