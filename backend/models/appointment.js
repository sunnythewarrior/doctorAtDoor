const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const appointmentSchema = mongoose.Schema({
  patientId: {
    type: ObjectId,
    ref: "patients",
    required: true,
  },
  doctorId: {
    type: ObjectId,
    ref: "doctors",
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  appointmentType: {
    type: String,
    enum: ["faceToFace", "videoCall"],
    default: "faceToFace", // Set a default value if needed
  },
  paymentStatus: {
    type: Boolean,
    default: false, // Payment status (true if paid, false if not)
  },
  // Add more fields as needed
});
appointmentSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("appointments", appointmentSchema);
