const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const patientSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  // Add more fields as needed
  medicalHistory: {
    type: String,
  },
  // Other specific details for patients
});
patientSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("patients", patientSchema);
