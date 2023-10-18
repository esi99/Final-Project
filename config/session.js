const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('../models/admin'); 

module.exports = expressSession({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/db',
    autoRemove: 'native'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
  },
});
