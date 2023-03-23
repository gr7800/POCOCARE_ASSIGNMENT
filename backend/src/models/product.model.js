const mongoose = require('mongoose'); //import mongoose for creating the model

//this the product model
const product = {
  title: { type: String, require: true },
  image: { type: String, require: true },
  quantity: { type: Number, require: true },
};

//here are the productSchema is created
const productSchema = new mongoose.Schema(product);

// here is the product model is created
const productModel = mongoose.model('Product', productSchema);

//  exporting the product model
module.exports = productModel;
