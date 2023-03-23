const productModel = require('../models/product.model');

// GET All Product function
async function getAllProducts(req, res) {

    try {
        const dbProducts = await productModel.find();
        return res.status(200).send(dbProducts); // sending the all product response to user
    } catch (error) {
        return res.status(404).send(error.message); // sending the response with error message
    }
}

// Geting a single product information by id
async function getSingleProduct() {
    const { id } = req.params; //getting the product id by req.params
    try {
        const dbProducts = await productModel.findOne({ _id: id }); // finding a single product from database

        return res.status(200).send(dbProducts);  // returning the single product info
    } catch (er) {
        return res.status(404).send(er.message); //sending the eror message
    }
}
module.exports = { getAllProducts, getSingleProduct };
