const express = require("express");
const router = express.Router();
const { signup, login, refreshToken } = require('./user.controller')

// SignUp Route
router.post('/signup', signup)

// Login Route
router.post('/login', login)


// Get Fresh Token from refesh token Route
router.get('/token', refreshToken)


module.exports = router;


