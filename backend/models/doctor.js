const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const doctorSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "users",
  },
  specialization: {
    type: String,
  },
  experience: {
    type: Number,
  },
  education: {
    type: String,
  },
  clinicAddress: {
    type: String,
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
