const {jwtSecret} = require('./secrets');
const jwt = require('jsonwebtoken');
const Users = require('../../users/user-model');

//ON FAILED REGISTRATION OR LOGIN DUE TO MISSING USERNAME OR PASSWORD FROM THE REQ BODY
//RETURN 'USERNAME AND PASSWORD REQUIRED'

const checkPayload = (req, res, next) => {
  try {
    const {username, password} = req.body
    if(!username || !password) {
      res.status(404).json({message: 'username and password required'})
    } else {
      req.username = username
      req.password = password
      next()
    }
  } catch (err){
    next(err)
  }
}

const uniqueUsername = async(req, res, next) => {
    try {
      const existingUsername = await Users.findByUsername({username: req.body.username})
      if(!existingUsername.length) {
        next()  
      } else {
        next({status: 401, message: 'username taken'})
      }
    } catch(err) {
      next(err)
    }
  }
  
  //ON FAILED LOGIN DUE TO USERNAME NOT EXISTING IN THE DB OR THE PASSWORD NOT BEING CORRECT
  //RETURN 'INVALID CREDENTIALS'
  
  const checkLoginPayload = async(req, res, next) => {
    try {
      const user = await Users.findByUsername(req.body.username) //need to decode hash for password comparison OR need to convert the input password to hash before calling db
      const password = await Users.validatePassword(req.body.password)
      if(!user || !password) {
        next({ status: 400, message: 'invalid credentials'})
      }
    } catch(err) {
      next(err)
    }
  }
  
  module.exports = {
    checkPayload, 
    uniqueUsername, 
    checkLoginPayload
  }
