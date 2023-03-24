const express = require("express");
const app = express.Router();
const { fetchAllProduct } = require('./Product.controller')


app.get('/getproduct', fetchAllProduct)



module.exports = app;