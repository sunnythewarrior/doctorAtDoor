const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const stateSchema = mongoose.Schema({
  name: { type: String },
  countryId: { type: ObjectId },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: ObjectId },
  updatedBy: { type: ObjectId },
});
stateSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("state", stateSchema);
