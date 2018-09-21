const axios = require('axios');
const bcrypt = require('bcrypt');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');

const secret = "Dad Jokes R Us"
   function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    }
    return jwt.sign(payload, secret, options)
}


// function restricted(req, res, next) {

//   const token = req.headers.authorization;

//   if (token) {
//       jwt.verify(token, secret, (err, decodedToken) => {
//           if(err) {
//               res.status(401).json({message: "token invalid"})
//           } else {
//               req.user = {username: decodedToken.username};
//               next();
//       }
//   })
//   } else {
//   res.status(401).json({message: "no token"})
//   }
// }


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      const token = generateToken(creds);
      res.status(201).json({ token, id });
    })
    .catch(err => {
      console.log('/api/register POST error:', err);
      res.status(500).send('Please try again later');
    });


}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)){
        const token = generateToken(user);
        res.status(200).json({ token });
    } else {
        res.status(401).json({message: 'You shall not pass!'});
      }
    })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
