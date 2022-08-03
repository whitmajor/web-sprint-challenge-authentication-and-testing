const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const tokenBuilder = require("./token-builder");
const {JWT_SECRET} = require("./secrets")

const Users = require("../../users/user-model");
const {checkPayload,checkUsername,} = require("./auth-middleware");

router.post("/register", checkPayload, checkUsername, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)

  Users.add({ username, password: hash })
    .then(newUser => {
      res.status(200).json(newUser)
    })
    .catch(next)
});

router.post("/login", checkPayload, (req, res,next) => {
  
  let { username, password } = req.body

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `welcome, ${user.username}`,
          token: buildToken(user)
        })
      } else {
        res.status(401).json({ message: 'invalid credentials' })
      }
    })
    .catch(next)
})

function buildToken(user) {
const payload = {
  subject: user.id,
  username: user.username
}
const options = {
  expiresIn: '1d'
}
return jwt.sign(payload, JWT_SECRET, options)
}




module.exports = router;