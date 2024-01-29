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
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: ObjectId },
    pinCode: { type: String },
  },
  bankDetails: [
    {
      bankName: {
        type: String,
      },
      accountNumber: {
        type: String,
      },
      ifscCode: {
        type: String,
      },
      accountType: {
        type: String,
      },
      isPrimary: {
        type: Boolean,
        default: true,
      },
    },
  ],
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: true },
  createdBy: { type: ObjectId },
  updatedBy: { type: ObjectId },
});
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("users", userSchema);
