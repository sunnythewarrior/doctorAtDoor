const country = require("../models/country");
const { ObjectId } = require("mongodb");
require("dotenv").config();

/** Add country */
exports.addCountry = async (req, res) => {
  try {
    let body = req.body;
    let checkData = await country.findOne({ name: body.name });
    if (checkData) {
      return res.status(400).send({
        success: false,
        message: "This Country Already Exist",
      });
    }
    let result = await country.create(body);
    res.status(200).send({
      data: result,
      success: true,
      message: "You have successfully registered",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

/** get All countries with pagination */
exports.getAllCountries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalDocuments = await country.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const result = await country.find().skip(startIndex).limit(limit);

    const paginationInfo = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalDocuments,
    };

    res.status(200).send({
      data: result,
      success: true,
      message: "All Countries List",
      pagination: paginationInfo,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

/** get country details by id */
exports.getCountryDetailsById = async (req, res) => {
  try {
    let checkData = await country.findById(req.params.id);
    if (checkData) {
      return res.status(200).send({
        data: result,
        success: true,
        message: "Country Details",
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

/** update country details by id */
exports.updateCountryDetailsById = async (req, res) => {
  try {
    let body = req.body;
    let checkData = await country.findById(req.params.id);
    if (checkData) {
      let result = await country.findByIdAndUpdate(
        req.params.id,
        { body },
        { new: true }
      );
      return res.status(200).send({
        data: result,
        success: true,
        message: "Country Details Updated",
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

/** delete country details by id */
exports.deleteCountryDetailsById = async (req, res) => {
  try {
    let body = req.body;
    let checkData = await country.findById(req.params.id);
    if (checkData) {
      let result = await country.findByIdAndUpdate(
        req.params.id,
        { isActive: false, isDeleted: true },
        { new: true }
      );
      return res.status(200).send({
        data: result,
        success: true,
        message: "Country Details Deleted",
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
