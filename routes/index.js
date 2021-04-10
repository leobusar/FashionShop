const express = require('express');

const router = express.Router();
// const auth =  require('../config/auth');
const usersRoutes = require('./users');
const productsRoutes = require('./products');
const cartRoutes = require('./cart');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('404 Not Found');
});

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
