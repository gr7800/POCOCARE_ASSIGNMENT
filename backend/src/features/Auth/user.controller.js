const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = async (req, res) => {
    const {name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).send({
                message: 'User already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name:name,
            email:email,
            password: hashedPassword,
        });
        return res.status(201).send({
            user: newUser,
            message: 'User has been created',
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email:req.body.email });
        console.log(user)
        if (!user) {
            return res.status(401).send({ message: 'Incorrect email or password' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ message: 'Incorrect email or password' });
        }
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );
        return res.status(200).send({ token, refreshToken, user, message: 'Login successful' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Refresh token controller
exports.refreshToken = async (req, res) => {
    const refreshToken = req.headers.authorization
    // console.log(refreshToken);
    try {
        if (!refreshToken) {
            return res.status(401).send({ message: 'Please login again' });
        }
       
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Please login again' });
            }
            const newToken = jwt.sign(
                {
                    _id: decoded._id,
                    email: decoded.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.status(200).send({ token: newToken, message: 'Token refreshed successfully' });
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
