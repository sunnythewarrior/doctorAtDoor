const bcrypt = require("bcrypt");

// Function to generate a hashed password
const generatePassword = async (plainTextPassword) => {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error generating hashed password:", error.message);
    throw new Error("Error generating hashed password");
  }
};

// Function to compare a plain text password with a hashed password
const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error.message);
    throw new Error("Error comparing passwords");
  }
};

// Export the functions
module.exports = {
  generatePassword,
  comparePasswords,
};
