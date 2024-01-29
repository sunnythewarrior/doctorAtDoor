const express = require("express");
const router = express.Router();

const {
  addCountry,
  getAllCountries,
  getCountryDetailsById,
  updateCountryDetailsById,
  deleteCountryDetailsById,
} = require("../controller/countryController");

router.route("/addCountry").post(addCountry);
router.route("/getAllCountries").get(getAllCountries);
router.route("/getCountryDetailsById/:id").get(getCountryDetailsById);
router.route("/updateCountryDetailsById/:id").put(updateCountryDetailsById);
router.route("/deleteCountryDetailsById/:id").put(deleteCountryDetailsById);

module.exports = router;
