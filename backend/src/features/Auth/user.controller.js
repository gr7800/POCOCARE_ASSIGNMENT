const User = require('./user.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// controller for Signup
exports.Signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).send({
                massage: "user already exist",
            });
        } else {
            const pass = await bcrypt.hash(password, 10);
            let user = await User.create({
                ...req.body,
                password: pass,
            });
            return res.status(201).send({
                user,
                message: "User has been created",
            });
        }

    } catch (error) {
        return res.status(404).send(error.message);
    }
}
// controller for Login 
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            let pass = await bcrypt.compare(password, user.password);
            if (!pass) {
                return res.status(401).send("incorrect password");
            } else {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email
                    },
                    "guddu123",
                    { expiresIn: "1h" }
                );
                const reftoken = jwt.sign({ _id: user._id, }, "guddu123", { expiresIn: "7d" })
                return res.status(200).send({ token, reftoken, user, message: "Login Successfully" });
            }
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

// controller for generating new token from ref token
exports.getrefToken = async (req, res) => {
    const ref_token = req.headers?.authorization?.split(' ')[1];
    try {
        if (ref_token) {
            jwt.verify(ref_token, "guddu123", (err, decoded) => {
                if (err) {
                    return res.status(401).send("Please Login Again");
                } else {
                    const { id } = decoded;
                    const newToken = jwt.sign(({ id }, "guddu123", { expiresIn: "7d" }))
                    return res.status(200).send({ newToken, message: "Login Successfully" });
                }
            })
        } else {
            return res.status(401).send("Please Login Again");
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
}