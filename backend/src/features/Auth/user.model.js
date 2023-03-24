const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          "Please enter a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("User", userSchema);