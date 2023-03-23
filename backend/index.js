require("dotenv").config();
const express = require('express');
const connect = require('./src/configs/db');
const PORT = process.env.PORT || 8080;
const cors = require('cors')
const app = express();
const userrouter = require('./src/features/Auth/user.route')
const productrouter = require('./src/features/Product/product.route')
const auth = require('./src/Middleware/auth.middleware')

app.use(cors({ origin: "*" }));

app.use(express.json())

// user authentication 
app.use('/user', userrouter)

// Authentication 
app.use(auth)
// protected route Just for Example
app.use('/product', productrouter)


// connection to the database
app.listen(PORT, async (req, res) => {
    try {
        await connect();
        console.log("Connected to mongodb")
    } catch (error) {
        console.log(error);
    }
    console.log(`http://localhost:${PORT}`);
});