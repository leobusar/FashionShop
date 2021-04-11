const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../config/auth');

const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/', auth.config.jwtAuth, CartController.get);
router.post('/update', auth.config.jwtAuth, validator.body(CartController.schema), CartController.update);

module.exports = router;
