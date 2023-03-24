const mongoose = require("mongoose");

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

module.exports = ProductModel = mongoose.model("product", ProductSchema);