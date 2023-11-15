const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const volleyball = require('volleyball')
apiRouter.use(volleyball)
const {JWT_SECRET} = process.env;


//set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
  
//Get JUST the token out of 'auth'
      const token = auth.slice(prefix.length);
    
//Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        } else {
          next({
            name: 'AuthorizationHeaderError',
            message: 'Authorization token malformed',
          });
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });
  
  apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log('User is set:', req.user);
    }
  
    next();
  });

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const winesRouter = require('./wines');
apiRouter.use('/wines', winesRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter