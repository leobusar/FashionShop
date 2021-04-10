'use strict'

const express = require('express');
const router = express.Router();
const auth =  require('../config/auth');
const usersRoutes = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('404 Not Found');
});

router.use('/user', usersRoutes);

module.exports = router;