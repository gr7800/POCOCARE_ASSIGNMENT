const express = require('express');

const { getAllProducts, getSingleProduct } = require('../controller/product.Controller'); // importing the product routes

const app = express.Router(); // creting the new routes for product

const { authMiddleware } = require('../middlware/authMiddleware'); // importing the auth middlware for protectingthe product route

app.get('/', authMiddleware, getAllProducts); // routes for accessing the all product
app.get('/:id', authMiddleware, getSingleProduct); // routes for acces the single product

module.exports = app;
