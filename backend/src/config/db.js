const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();

const DB_URL = process.env.DB_URL;

// here are the functions for connect to db using mongose

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;