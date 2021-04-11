const express = require('express');
const multer = require('multer');

const CsvController = require('../controllers/CsvController');
// const fileFilter = require('../utils/fileFilter');

const upload = multer({ dest: 'tmp/' });

const router = express.Router();
const UserController = require('../controllers/UserController');

// AuthController

/* GET /users - Users listing. */
router.get('/', UserController.list);

/** POST /api/users/upload - Upload csv files with users */
router.post('/upload', upload.single('csvFile'), CsvController.csvUsers);

module.exports = router;
