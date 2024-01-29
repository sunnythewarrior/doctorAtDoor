const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import your User model
require("dotenv").config();

// Secret key for signing and verifying tokens
const secretKey = process.env.SECRET_KEY;

// Function to generate a JWT
const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const payload = {
      userId: user._id.toString(),
      userRole: user.userType.toLowerCase(), // Assuming userType represents the user role
    };

    const options = {
      expiresIn: "1h",
    };

    return jwt.sign(payload, secretKey, options);
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed");
  }
};

// Function to verify a JWT
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    throw new Error("Token verification failed");
  }
};
