// Import the User model and required libraries
const UserModel = require('./User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login controller
exports.LoginController = async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;
    try {
        // Find a user with the provided email in the database
        const userpersent = await UserModel.findOne({ email:req.body.email });
        console.log(userpersent)
        // If no user is found, send a 401 Unauthorized status code
        if (!userpersent) {
            return res.status(401).send({ message: 'Incorrect email or password' });
        }
        // Check if the password provided matches the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, userpersent.password);
        if (!isPasswordCorrect) {
            // If the password does not match, send a 401 Unauthorized status code
            return res.status(401).send({ message: 'Incorrect email or password' });
        }
        // If the email and password are correct, create a JWT token and send it to the client
        const token = jwt.sign(
            {
                _id: userpersent._id,
                email: userpersent.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // Create a new refresh token and send it to the client
        const refreshToken = jwt.sign(
            {
                _id: userpersent._id,
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );
        // Send a success response with the tokens and user data
        return res.status(200).send({ token, refreshToken, userpersent, message: 'Login successful' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

// Signup controller
exports.SignupController = async (req, res) => {
    // Extract name, email, and password from request body
    const {name, email, password } = req.body;
    try {
        // Check if a user with the provided email already exists in the database
        const exsistinguser = await UserModel.findOne({ email });
        if (exsistinguser) {
            // If a user already exists, send a 409 Conflict status code
            return res.status(409).send({
                message: 'User already exists',
            });
        }
        // Hash the password and create a new user in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            name:name,
            email:email,
            password: hashedPassword,
        });
        // Send a success response with the newly created user data
        return res.status(201).send({
            user: newUser,
            message: 'User has been created',
        });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

// This is the controller function for refreshing a user's access token using their refresh token.
exports.TokenRefrssController = async (req, res) => {
    // Retrieve the refresh token from the request headers.
    const refreshToken = req.headers["authorization"]
    // Check if the refresh token is present in the request headers.
    if (!refreshToken) {
        return res.status(401).send({ message: 'Please login again' });
    }
    
    try {
        // Verify the refresh token using the JWT_REFRESH_SECRET stored in the environment variables.
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            // If there's an error verifying the token, return an error message.
            if (err) {
                return res.status(401).send({ message: 'Please login again' });
            }
            // If the token is verified successfully, create a new access token using the user's ID and email
            // and sign it using the JWT_SECRET stored in the environment variables.
            const newToken = jwt.sign(
                {
                    _id: decoded._id,
                    email: decoded.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            // Return the new access token to the client along with a success message.
            return res.status(200).send({ token: newToken, message: 'Token refreshed successfully' });
        });
    } catch (error) {
        // If there's an error during the token refresh process, return an error message.
        return res.status(500).send(error.message);
    }
    };
    
    
