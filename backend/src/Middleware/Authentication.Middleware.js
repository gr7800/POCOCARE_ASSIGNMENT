const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (token) {
            const decoded = jwt.decode(token)
            if (decoded.id === req.params.id) {
                next()
            } else {
                return res.status(401).send("Not Authorized")
            }
        } else {
            return res.status(401).send("Token required")
        }

    }
    catch (error) {
        return res.status(404).send(error.message);
    }
}