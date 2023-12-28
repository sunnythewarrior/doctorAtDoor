const User = require("../models/user");
const Patient = require("../models/patients");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment"); // Fix the typo in the model import
const {
  generatePassword,
  comparePasswords,
} = require("../middlewares/bcryptPassword");

const { generateToken, verifyToken } = require("../middlewares/authentication");
const { ObjectId } = require("mongodb");

// signup user

exports.signup = async (req, res) => {
  try {
    const body = req.body;
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

//login user
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

    const token = await generateToken({
      userId: findUser._id,
      userType: findUser.userType,
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const body = req.body;
    const findUser = await User.findOne({ _id: ObjectId(req.params.id) });

    if (!findUser) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

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

//get user by id
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

//soft Delete user
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
