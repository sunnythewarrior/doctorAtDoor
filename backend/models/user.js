const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const userSchema = mongoose.Schema({
  userType: {
    type: String,
    enum: ["patient", "doctor", "admin"],
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  password: { type: String },
  profileImage: {
    key: { type: String },
    location: { type: String },
  },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: true },
  createdBy: { type: ObjectId },
  updatedBy: { type: ObjectId },
});
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("users", userSchema);
