// This is a Mongoose schema for the Product model.
const mongoose = require("mongoose");

// Product schema
const ProductSchema = new mongoose.Schema(
    {
        title: String,
        image1: String,
        price: Number,
        quantity: Number,
        category: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Export the Product model using the ProductSchema
module.exports = ProductModel = mongoose.model("product", ProductSchema);