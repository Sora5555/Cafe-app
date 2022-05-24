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

const OrderSchema = new Schema({
  id_order: reqString,
  id_table: reqInt,
  month: reqInt,
  date: reqInt,
  officer: reqString,
  total_cost: reqInt,
  notes: String,
  status: reqString,
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
