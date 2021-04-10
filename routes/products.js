const express = require('express');
// const auth = require('../config/auth');

const router = express.Router();
const ProductController = require('../controllers/ProductController');

router
  .route('/')
/** GET /api/products - Get list of products */
  .get(ProductController.list)

/** POST /api/products - Create new product */
  .post(ProductController.create);

module.exports = router;
