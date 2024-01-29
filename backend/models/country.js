const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const countrySchema = mongoose.Schema({
  name: { type: String },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: true },
  createdBy: { type: ObjectId },
  updatedBy: { type: ObjectId },
});
countrySchema.plugin(aggregatePaginate);
module.exports = mongoose.model("country", countrySchema);
