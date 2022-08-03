// Write your tests here
/*
const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');
const jwt = require('jsonwebtoken')
*/
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')
const Users = require('../users/user-model')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

test('make sure environment is set correctly', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('user in database after successful register', async () => {
    let result = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Beth', password: '1234' })
    result = await Users.findById(1)
    expect(result.username).toBe('Beth')
  })
  test('accurate message for failed register with duplicate username', async () => {
    const result = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Beth', password: '1234' })
    expect(result.body.message).toMatch(/username taken/i)
  })
})

describe('[POST] /login', () => {
  test('accurate message for successful login', async () => {
    const result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Beth', password: '1234' })
    expect(result.body.message).toMatch(/welcome, Beth/i)
  })
  test('accurate message for failed login with wrong password', async () => {
    const result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Beth', password: 'abcd' })
    expect(result.body.message).toMatch(/invalid credentials/i)
  })
})

describe('[GET] /jokes', () => {
  test('accurate status for successful request', async () => {
    let result = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Bob', password: '5678' })
    result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Bob', password: '5678' })
    result = await request(server)
      .get('/api/jokes')
      .set('Authorization', result.body.token)
    expect(result.status).toBe(200)
  })
  test('accurate message for failed request', async () => {
    let result = await request(server)
      .get('/api/jokes')
    expect(result.body.message).toMatch(/token required/i)
  })
})






//const {JWT_SECRET} = require('../api/auth/secrets')
/*
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
test('make sure environment is set correctly', () => {
  expect(process.env.NODE_ENV).toBe('testing')
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
  describe('Login', () => {
    test('Correct data object is returned', async () => {
      let response = await request(server).post('/api/auth/login').send({password: "1234"});
      expect(response.body.message).toBe("username and password required")
  
    })

  })
  describe('[GET] /jokes', () => {
    test('accurate status for successful request', async () => {
      let result = await request(server)
        .post('/api/auth/register')
        .send({ username: 'Bob', password: '5678' })
      result = await request(server)
        .post('/api/auth/login')
        .send({ username: 'Bob', password: '5678' })
      result = await request(server)
        .get('/api/jokes')
        .set('Authorization', result.body.token)
      expect(result.status).toBe(200)
    })
    test('accurate message for failed request', async () => {
      let result = await request(server)
        .get('/api/jokes')
      expect(result.body.message).toMatch(/token required/i)
    })
  })
})
*/
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

