const express = require('express');
const auth = require('../config/auth');

const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/', auth.config.jwtAuth, CartController.get);
router.post('/update', auth.config.jwtAuth, CartController.update);

module.exports = router;
