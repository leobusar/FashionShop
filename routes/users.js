const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');

// AuthController

/* GET /users - Users listing. */
router.get('/', UserController.list);

module.exports = router;
