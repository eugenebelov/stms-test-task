
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('fake-server/users.json')
const userdb = JSON.parse(fs.readFileSync('fake-server/users-auth.json', 'UTF-8'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  if (req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  }
  if (req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  }

  res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);

  next();
});

const SECRET_KEY = '123456789'


// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY)
}

// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}


server.post('/login', (req, res) => {
  console.log(req.body)

  const {email, password} = req.body
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  res.status(200).json({
    access_token,
    'uid': userdb.users.findIndex(user => user.email === email)
  })
})

server.use(/^(?!\/login).*$/,  (req, res, next) => {
  console.log(req.body)
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(3000, () => {
  console.log('Run Auth API Server')
})
