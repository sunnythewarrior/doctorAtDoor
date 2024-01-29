const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  updateUser,
  deleteUser,
  getUserDetailsById,
  updateUserBankDetails,
} = require("../controller/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getUserDetailsById/:id").get(getUserDetailsById);
router.route("/updateUser/:id").put(updateUser);
router.route("/updateUserBankDetails/:id").put(updateUserBankDetails);
router.route("/deleteUser/:id").put(deleteUser);

module.exports = router;
