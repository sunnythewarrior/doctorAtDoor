const express = require("express");
const router = express.Router();

const {
  addState,
  getAllStates,
  getStateDetailsById,
  updateStateDetailsById,
  deleteStateDetailsById,
} = require("../controller/stateController");

router.route("/addState").post(addState);

router.route("/getAllStates").get(getAllStates);
router.route("/getStateDetailsById/:id").get(getStateDetailsById);
router.route("/updateStateDetailsById/:id").put(updateStateDetailsById);
router.route("/deleteStateDetailsById/:id").put(deleteStateDetailsById);

module.exports = router;
