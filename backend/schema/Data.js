const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  email: String,
  password: String,
  favorite: [String],
});

module.exports = mongoose.model("Data", DataSchema);
