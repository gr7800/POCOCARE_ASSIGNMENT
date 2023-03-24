// This is a MongoDB connection module using Mongoose.
const mongoose = require("mongoose");

// Export an async function that connects to the MongoDB database specified in the .env file.
module.exports = connect = async () => {
return await mongoose.connect(process.env.URL);
};