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

const OrderDrinkSchema = new Schema({
  id_order: reqString,
  name: reqString,
  quantity: reqInt,
  price: reqInt,
});

const OrderDrink = mongoose.model("orderdrink", OrderDrinkSchema);

module.exports = OrderDrink;
