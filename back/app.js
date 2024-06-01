const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');


const { internalError, notFound, conflict, unauthorized } = require('./utils/errors');
const { MongoClient, ServerApiVersion } = require("mongodb");

const UserModel = require('./models/user');

// user routes
const getUser = require('./routes/user/get');
const postUser = require('./routes/user/post');

// me routes
const getMe = require('./routes/me/get');

// login routes
const postLogin = require('./routes/login/post');
const { default: mongoose } = require('mongoose');

/* const client = new MongoClient("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1", { useNewUrlParser: true, useUnifiedTopology: true }); */

mongoose.connect("mongodb://127.0.0.1:27017/profile-pet").then(() => console.log('Connected to MongoDB')).catch(console.error);

/* client.connect().then(() => console.log('Connected to MongoDB')).catch(console.error); */

const server = http.createServer((req, res) => {
  try {
  var uri = url.parse(req.url).pathname;
  const method = req.method;

  const methodAndUri = `${method} ${uri}`;
  // unuthed user
  switch (methodAndUri) {
    case 'GET /':
      return notFound(res);
    case 'POST /user':
      return postUser(req, res);
    case 'POST /login':
      return postLogin(req, res);
    default:
      break;
  }

  const { authorization } = req.headers;


  if (!authorization) {
    throw { type: 'unauthorized' };
  }

  let decoded;

  try {
    const token = authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw { type: 'unauthorized' };
  }



  // authed user
  switch (methodAndUri) {
    case 'GET /user':
      return getUser(req, res);
    case 'GET /me':
      return getMe({req, res, _id: decoded._id});
    default:
      break;
  }
  } catch (error) {
    console.log(error);
    if(error.type === 'notFound') {
      return notFound(res);
    }
    if(error.type === 'conflict') {
      return conflict(res);
    }
    if(error.type === 'unauthorized') {
      return unauthorized(res);
    }

    return internalError(res);
  }
});

server.listen(3000);
