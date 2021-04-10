const express = require('express');

const router = express.Router();
// const auth =  require('../config/auth');
const usersRoutes = require('./users');
const productsRoutes = require('./products');
const cartRoutes = require('./cart');
const authRoutes = require('./auth');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('404 Not Found');
});

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/cart', cartRoutes);
router.use('/auth', authRoutes);

module.exports = router;
