// Write your tests here
const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

test('sanity', () => {
  expect(true).toBe(true)
})
beforeAll( async ()=> {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async ()=> {
  await db('users').truncate()
})
afterAll( async ()=> {
  await db.destroy()
})

describe('[POST] /register', () => {
  test('responds with error when no username is entered', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: '', 
      password: 'abcd',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
  test('responds with error when no password is entered', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'bill', 
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
})
describe('[POST] /login', () => {
  test('responds with error when no username is entered', async () => {
    const res = await request(server).post('/login').send({
      username: '', 
      password: 'whatever'
    })
    expect(res.status).toBe(500)
  })
  test('responds with error when no password is entered', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'harry', 
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
}) 

