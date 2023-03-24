// This is an Express router that defines the endpoints for User related routes.
const express = require("express");
const router = express.Router();
const { SignupController, LoginController, TokenRefrssController } = require('./User.controller')

// Route for User Signup
router.post('/signup', SignupController)

// Route for User Login
router.post('/login', LoginController)

// Route to get a fresh token from a refresh token
router.get('/token', TokenRefrssController)

// Export the router to use in the main app.js file
module.exports = router;