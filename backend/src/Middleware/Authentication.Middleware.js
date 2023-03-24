// This is a middleware function that checks if a user is authorized to access a certain resource.
module.exports = async (req, res, next) => {
    try {
        // Retrieve the token from the request headers.
        const token = req.headers["authorization"];
        // If the token is present, decode it.
        if (token) {
            const decoded = jwt.decode(token)
            // Check if the decoded user ID matches the ID parameter in the request.
            if (decoded.id === req.params.id) {
                // If the user is authorized, move on to the next middleware function.
                next()
            } else {
                // If the user is not authorized, return a 401 (Unauthorized) error.
                return res.status(401).send("Not Authorized")
            }
        } else {
            // If no token is present in the request headers, return a 401 (Unauthorized) error.
            return res.status(401).send("Token required")
        }
    }
    catch (error) {
        // If there's an error during the authorization process, return a 404 (Not Found) error.
        return res.status(404).send(error.message);
    }
}