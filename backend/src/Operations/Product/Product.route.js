// This is an Express router for the Product API endpoints.
const express = require("express");
const app = express.Router();

// Import the Product controller functions
const { fetchAllProduct } = require('./Product.controller')

// GET endpoint to fetch all products
app.get('/getproduct', fetchAllProduct)

// Export the router as a module
module.exports = app;