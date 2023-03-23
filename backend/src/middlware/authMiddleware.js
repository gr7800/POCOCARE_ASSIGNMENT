require('dotenv').config();
const jwt = require('jsonwebtoken');  // importing jwt for verifying the token

// creating auth middleware function
async function authMiddleware(req, res, next) {

    const token = req.headers['authorization']; // geting token from auth req.headers with authorization

    //   console.log(token, 'token'); //consoling the token

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized Person' }); //returning the response if token is not persent
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY); //verifying the token
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        // If the token is invalid or expired, send a 401 Unauthorized error
        return res.status(401).send({ error: 'Unauthorized Error' });
    }
}

// function for refress the token
async function authRefreshTokenMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token, 'token');

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized Person' }); // checking the token is get or not
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_JWT_TOKEN_KEY); // verfiying the token
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        // If the token is invalid or expired, send a 401 Unauthorized error
        return res.status(401).send({ error: 'Unauthorized Error' });
    }
}

module.exports = { authMiddleware, authRefreshTokenMiddleware };
