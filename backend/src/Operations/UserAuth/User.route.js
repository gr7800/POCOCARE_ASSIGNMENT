const express = require("express");
const router = express.Router();
const { SignupController, LoginController, TokenRefrssController } = require('./User.controller')

// SignUp Route
router.post('/signup', SignupController)

// Login Route
router.post('/login', LoginController)


// Get Fresh Token from refesh token Route
router.get('/token', TokenRefrssController)


module.exports = router;


