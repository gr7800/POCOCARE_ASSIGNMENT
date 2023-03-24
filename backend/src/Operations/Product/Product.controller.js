// This is a controller function to fetch all products from the database and send them as a response.
const ProductModel = require('./Product.model')

// Controller function to get all products
exports.fetchAllProduct = async (req, res) => {

try {
    // Find all products from the database using ProductModel
    let product = await ProductModel.find()
    // Send the products as a response
    return res.status(200).send(product);

} catch (error) {
    // Handle error if products cannot be fetched from the database
    return res.status(404).send(error.message);
}
}