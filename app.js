'use strict'
var createError = require('http-errors');
var express = require('express');
//var path = require('path');
const debug = require('debug')('shoppingcart:app')
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()
const { config } = require('./config/auth');

const indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    debug("Info: database connected!!!")
  })
  .catch(err => {
    debug(`Error: ${err.message}`)
  });

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Express Error Handler
app.use((err, req, res) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/Not Found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

module.exports = app;
