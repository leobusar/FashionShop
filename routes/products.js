const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'tmp/' });

const auth = require('../config/auth');

const router = express.Router();
const ProductController = require('../controllers/ProductController');
const CsvController = require('../controllers/CsvController');

/** GET /api/products - Get list of products */
router.get('/', ProductController.list);

/** POST /api/products - Create new product */
router.post('/', auth.config.jwtAuth, ProductController.create);

/** GET /api/products/:id - Get product */
router.get('/:id', ProductController.get);

/** PUT /api/products/:id - Update product */
router.put('/:id', auth.config.jwtAuth, ProductController.update);

/** DELETE /api/products/:id - Delete product */
router.delete('/:id', auth.config.jwtAuth, ProductController.remove);

/** POST /api/products/upload - Upload csv files with products */
router.post('/upload', upload.single('csvFile'), CsvController.csvProducts);

module.exports = router;
