
const User = require('../../users/user-model');

//ON FAILED REGISTRATION OR LOGIN DUE TO MISSING USERNAME OR PASSWORD FROM THE REQ BODY
//RETURN 'USERNAME AND PASSWORD REQUIRED'
async function checkPayload(req, res, next) {
  try {
      const { username, password } = req.body
      if (!username || !password) {
          res.status(404).json({ message: 'username and password required' })
      } else {
          req.username = username
          req.password = password
          next()
      }
  } catch (err) {
      next(err)
  }
}

async function checkUsername(req, res, next) {
  try {
      const users = await User.findByUsername(req.body.username)
      if(!users.length) {
          next()
      } else {
          res.status(422).json({ message: 'username taken' })
      }
  } catch (err) {
      next(err)
  }
}
  //ON FAILED LOGIN DUE TO USERNAME NOT EXISTING IN THE DB OR THE PASSWORD NOT BEING CORRECT
  //RETURN 'INVALID CREDENTIALS'
  
 
 
  
  module.exports = {
    checkUsername, 
    checkPayload, 
    
  }
