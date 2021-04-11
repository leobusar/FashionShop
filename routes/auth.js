const express = require('express');

const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

// const validator = validation.createValidator({});

// AuthController

/** POST /api/auth/register - Register new User */
router.post('/register', validator.body(UserController.schema), AuthController.register);

/** POST /api/auth/login - Login User */
router.post('/login', validator.body(UserController.schema), AuthController.login);

module.exports = router;
