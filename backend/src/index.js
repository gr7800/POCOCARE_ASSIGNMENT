// Importing the neccerry dependencies

require('dotenv').config();

const express = require('express'); // importing express for creating the app

const app = express(); // creating app using express
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth.Routes');
const productRouter = require('./routes/product.route');

const PORT = process.env.PORT || 8080;  // insialising the default port number


app.use(express.json());
app.use(cors()); 

app.use('/auth', authRouter);

app.use('/product', productRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome');
});

app.listen(PORT, async () => {
    try {
        await connectDB;
        console.log(`Listening at http://localhost:${PORT}`)
    } catch (error) {
        console.log(error);
    }
})
