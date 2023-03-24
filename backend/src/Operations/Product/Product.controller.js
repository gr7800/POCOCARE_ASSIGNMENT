const ProductModel = require('./Product.model')

// Basic Get Product Controller
exports.fetchAllProduct = async (req, res) => {

    try {
        let product = await ProductModel.find()
        return res.status(200).send(product);

    } catch (error) {
        return res.status(404).send(error.message);
    }
}