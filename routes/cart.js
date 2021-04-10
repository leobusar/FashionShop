const express = require('express');

const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/', CartController.get);
router.post('/update', CartController.update);

module.exports = router;
