require("dotenv").config();
const express = require('express');
const connectDB = require('./src/configs/db');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const app = express();
const userRouter = require('./src/features/Auth/user.route');
const productRouter = require('./src/features/Product/product.route');
const authMiddleware = require('./src/Middleware/auth.middleware');

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use(authMiddleware); // Middleware for protecting routes
app.use('/product', productRouter);

// Connect to database and start server
async function startServer() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
