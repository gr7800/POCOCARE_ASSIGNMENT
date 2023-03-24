// This is a mongoose schema that defines the structure of a User document in a MongoDB collection.
const mongoose = require("mongoose");

// Define the user schema with name, email, and password fields.
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
        /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    // Set versionKey to false to exclude __v field in response.
    versionKey: false,
    // Set timestamps to true to automatically add createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Export the User model using the userSchema.
module.exports = mongoose.model("User", userSchema);