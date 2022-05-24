const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};
const reqInt = {
  type: Number,
  required: true,
};

const TableSchema = new Schema({
  id_table: reqInt,
});

const Table = mongoose.model("table", TableSchema);

module.exports = Table;
