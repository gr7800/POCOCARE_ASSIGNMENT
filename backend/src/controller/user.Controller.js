require('dotenv').config();

// Importing the required module and componet from diffrent pages
const userModel = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Creating the function for Refressing the token
function RefreshToken(req, res) {
    const token = jwt.sign(
        { id: req.user.name, email: req.user.email },
        process.env.JWT_TOKEN_KEY,
        { expiresIn: '10000ms' }
    );
    return res
        .status(200)
        .send({ message: 'token genrated successfull', token });
}

// function for login user
async function Login(req, res) {
    const { name, email, password } = req.body; //Taking users data from body

    try {
        const existingUser = await userModel.findOne({ email: email });

        // checking the user is alredy exist or not
        if (existingUser && (await argon2.verify(existingUser.password, password))) {

            // genrating user token by using the user name and email
            const token = jwt.sign(
                { id: existingUser.name, email: existingUser.email },
                process.env.JWT_TOKEN_KEY,
                { expiresIn: '10000ms' }
            );

            //Genrating the refress token 
            const refreshToken = jwt.sign(
                { id: existingUser.name, email: existingUser.email },
                process.env.REFRESH_JWT_TOKEN_KEY,
                { expiresIn: '24h' }
            );

            return res
                .status(200)
                .send({ message: 'Login Successfull', token, refreshToken }); //Sending the Login Succesfull response with status code 200
        }

        return res.status(401).send({ message: 'You are unable to sign in' });

    } catch (error) {
        return res.status(404).send(error.message); //sending the error response with 404 status code
    }
}

// Function for signup the user

async function Signup(req, res) {

    const { name, email, password } = req.body; // geting user creds from body

    try {
        const existingUser = await userModel.findOne({ email: email }); // checking the user is alredy exsist or not

        if (existingUser) {

            return res.status(404).send({ message: 'User Already existed' }); // if useris allready exist sendind the user exsist response with status code 404
        }

        const hash = await argon2.hash(password);  // hasing the password before saving to database

        await userModel.create({ name, email, password: hash }); // creating the new user

        return res.status(200).send({ message: 'User created Successfully' });  // sending the response after suceesfullycreating a user

    } catch (error) {

        return res.status(404).send(error.message); // sending the error message with status code 404

    }
}


module.exports = { Login, Signup, RefreshToken };
