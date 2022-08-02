// Write your tests here
const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');
const jwt = require('jsonwebtoken')
//const {JWT_SECRET} = require('../api/auth/secrets')

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
describe('Register', () => {

  test('Correct data object is returned', async () => {
    let response = await request(server).post('/api/auth/register').send({username: 'Des', password: "1234"});
    expect(response.body.username).toBe("Des");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("password");

  })
})
/*
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}
*/
