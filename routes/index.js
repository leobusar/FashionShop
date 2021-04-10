const express = require('express');

const router = express.Router();
// const auth =  require('../config/auth');
const usersRoutes = require('./users');
const productsRoutes = require('./products');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('404 Not Found');
});

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
