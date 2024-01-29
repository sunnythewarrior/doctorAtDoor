const State = require("../models/state");
const { ObjectId } = require("mongodb");
require("dotenv").config();

/** Add state */
exports.addState = async (req, res) => {
  try {
    let body = req.body;
    let checkData = await State.findOne({ name: body.name });
    if (checkData) {
      return res.status(400).send({
        success: false,
        message: "This State Already Exists",
      });
    }
    let result = await State.create(body);
    res.status(200).send({
      data: result,
      success: true,
      message: "You have successfully added a state",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

/** get All states with pagination */
exports.getAllStates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalDocuments = await State.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const result = await State.find().skip(startIndex).limit(limit);

    const paginationInfo = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalDocuments,
    };

    res.status(200).send({
      data: result,
      success: true,
      message: "All States List",
      pagination: paginationInfo,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

/** get state details by id */
exports.getStateDetailsById = async (req, res) => {
  try {
    let checkData = await State.findById(req.params.id);
    if (checkData) {
      return res.status(200).send({
        data: checkData,
        success: true,
        message: "State Details",
      });
    }
    return res.status(400).send({
      data: checkData,
      success: true,
      message: "No Details Found with this ID",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

/** update state details by id */
exports.updateStateDetailsById = async (req, res) => {
  try {
    let body = req.body;
    let checkData = await State.findById(req.params.id);
    if (checkData) {
      let result = await State.findByIdAndUpdate(req.params.id, body, {
        new: true,
      });
      return res.status(200).send({
        data: result,
        success: true,
        message: "State Details Updated",
      });
    }
    return res.status(400).send({
      data: checkData,
      success: true,
      message: "No Details Found with this ID",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

/** delete state details by id */
exports.deleteStateDetailsById = async (req, res) => {
  try {
    let checkData = await State.findById(req.params.id);
    if (checkData) {
      let result = await State.findByIdAndUpdate(
        req.params.id,
        { isActive: false, isDeleted: true },
        { new: true }
      );
      return res.status(200).send({
        data: result,
        success: true,
        message: "State Details Deleted",
      });
    }
    return res.status(400).send({
      data: checkData,
      success: true,
      message: "No Details Found with this ID",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
