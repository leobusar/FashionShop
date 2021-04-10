const express = require('express');
// const auth = require('../config/auth');

const router = express.Router();
const ProductController = require('../controllers/ProductController');

/** GET /api/products - Get list of products */
router.get('/', ProductController.list);

/** POST /api/products - Create new product */
router.post('/', ProductController.create);

/** GET /api/products/:id - Get product */
router.get('/:id', ProductController.get);

/** PUT /api/products/:id - Update product */
router.put('/:id', ProductController.update);

/** DELETE /api/products/:id - Delete product */
router.delete('/:id', ProductController.remove);

module.exports = router;
