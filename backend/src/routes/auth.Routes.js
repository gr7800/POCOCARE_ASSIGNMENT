const express = require('express');

const app = express.Router(); // creating rout by using express

const { Login, Signup, RefreshToken } = require('../controller/user.Controller'); // importing  user  controllers

const { authRefreshTokenMiddleware } = require('../middlware/authMiddleware'); // importing the middlware for verifying the authentication

app.get('/refreshtoken', authRefreshTokenMiddleware, RefreshToken); // creating the refress token routes

app.post('/login', Login); // creating the login route
app.post('/signup', Signup); //creting the signup route

module.exports = app;
