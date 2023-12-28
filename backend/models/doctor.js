const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const doctorSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  clinicAddress: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: ObjectId,
      ref: "appointments",
    },
  ],
});
doctorSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("doctors", doctorSchema);
