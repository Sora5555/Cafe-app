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

const OrderFoodSchema = new Schema({
  id_order: reqString,
  name: reqString,
  quantity: reqInt,
  price: reqInt,
});

const OrderFood = mongoose.model("orderfood", OrderFoodSchema);

module.exports = OrderFood;
