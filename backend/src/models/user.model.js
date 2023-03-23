const mongoose = require('mongoose');

// here are the user model
const user = {
  name: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
};

// here are the userschema for our app
const userSchema = new mongoose.Schema(user);

//here we crated a usermodel
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
