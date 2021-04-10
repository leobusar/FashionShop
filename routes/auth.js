const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/AuthController');

// AuthController

/** POST /api/auth/register - Register new User */
router.post('/register', AuthController.register);

/** POST /api/auth/login - Login User */
router.post('/login', AuthController.login);

module.exports = router;
