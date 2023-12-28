const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// Secret key for signing and verifying tokens
const secretKey = process.env.SECRET_KEY; // Use the correct environment variable name

// Function to generate a JWT
const generateToken = (payload) => {
  const options = {
    expiresIn: "1h", // Token expiration time (e.g., 1 hour)
  };

  return jwt.sign(payload, secretKey, options);
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

// Example usage:
const userId = "123";
const userRole = "user";

// Generate a token
const token = generateToken({ userId, userRole });

// Verify the token
try {
  const decodedToken = verifyToken(token);
  console.log("Decoded Token:", decodedToken);
} catch (error) {
  console.error("Token verification failed:", error.message);
}
