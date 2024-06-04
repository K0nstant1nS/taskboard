const cookieParser = require('cookie-parser');

const express = require('express');


const { internalError, notFound, conflict, unauthorized } = require('./utils/errors');
const { MongoClient, ServerApiVersion } = require("mongodb");

const UserModel = require('./models/user');

// user routes
const getUser = require('./routes/user/get');
const postUser = require('./routes/user/post');

// me routes
const getMe = require('./routes/me/get');

// login routes
const postLogin = require('./routes/login/signin');
const { default: mongoose } = require('mongoose');
const { default: errorHandler } = require('./middlewares/error');

mongoose.connect("mongodb://127.0.0.1:27017/profile-pet").then(() => console.log('Connected to MongoDB')).catch(console.error);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.post('/user', (req, res) => {
  postUser(req, res);
});

app.get('/me', (req, res) => {
  getUser(req, res);
});

app.listen(3001, () => {
  console.log('Server started on port 3000');
});

app.use(errorHandler);
