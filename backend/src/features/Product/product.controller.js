const Product = require('./product.model')

// Basic Get Product Controller
exports.getproduct = async (req, res) => {

    try {
        let product = await Product.find()
        return res.status(200).send(product);

    } catch (error) {
        return res.status(404).send(error.message);
    }
}