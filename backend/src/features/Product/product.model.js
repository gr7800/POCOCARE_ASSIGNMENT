const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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

module.exports = Product = mongoose.model("product", productSchema);