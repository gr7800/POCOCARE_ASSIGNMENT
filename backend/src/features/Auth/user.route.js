const express = require("express");
const app = express.Router();
const { Signup, login, getrefToken } = require('./user.controller')

// SignUp Route
app.post('/signup', Signup)

// Login Route
app.post('/login', login)


// Get Fresh Token from refesh token Route
app.get('/getfreshtoken', getrefToken)


module.exports = app;


