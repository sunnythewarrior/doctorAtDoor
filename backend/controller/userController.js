const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Patient = require("../models/patients");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const {
  generatePassword,
  comparePasswords,
} = require("../middlewares/bcryptPassword");

const { ObjectId } = require("mongodb");

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

// signup user
exports.signup = async (req, res) => {
  try {
    const body = req.body;
    body.userType = body.userType.toLowerCase();
    body.password = await generatePassword(body.password);
    const findUser = await User.findOne({ email: body.email });

    if (findUser) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }

    const result = await User.create(body);

    let data;

    if (result.userType.toLowerCase() === "patient") {
      data = await Patient.create({ userId: result._id });
    } else if (result.userType.toLowerCase() === "doctor") {
      data = await Doctor.create({ userId: result._id });
    }

    res.status(200).send({
      success: true,
      message: "You have successfully registered",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// login user
exports.login = async (req, res) => {
  try {
    const body = req.body;
    const findUser = await User.findOne({ email: body.email });

    if (!findUser) {
      return res.status(400).send({ success: false, message: "Invalid User" });
    }

    const passwordCheck = await comparePasswords(
      body.password,
      findUser.password
    );

    if (!passwordCheck) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Password" });
    }

    const token = await generateToken(findUser._id); // Pass the user ID directly

    res.status(200).send({
      success: true,
      message: "Login successful",
      token: token,
      userId: findUser._id,
      userRole: findUser.userType,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const body = req.body;
    const userId = new ObjectId(req.params.id);
    const findUser = await User.findOne({ _id: userId });

    if (!findUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: body },
      { new: true }
    );

    if (!updateUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    res.status(200).send({
      success: true,
      message: "User Data Successfully Updated",
      data: updateUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.updateUserBankDetails = async (req, res) => {
  try {
    const body = req.body;
    const userId = new ObjectId(req.params.id);
    const findUser = await User.findOne({ _id: userId });

    if (!findUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    // Extract isPrimary from the new bank details array
    const isPrimary = body.bankDetails?.some((detail) => detail.isPrimary);

    if (isPrimary) {
      // Set isPrimary to false for existing bank details
      await User.updateOne(
        { _id: userId, "bankDetails.isPrimary": true },
        { $set: { "bankDetails.$[].isPrimary": false } }
      );
    }

    // Add the new bank detail
    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { bankDetails: body.bankDetails } },
      { new: true }
    );

    if (!updateUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    res.status(200).send({
      success: true,
      message: "User Data Successfully Updated",
      data: updateUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// get user by id
exports.getUserDetailsById = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await User.findById(userId);

    if (!result) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    res.status(200).send({
      success: true,
      message: "User Details",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// soft Delete user
exports.deleteUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: ObjectId(req.params.id) });

    if (!findUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false, isDeleted: true },
      { new: true }
    );

    if (!updateUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    res.status(204).send({
      success: true,
      message: "User Deactivated Successfully",
      data: updateUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
