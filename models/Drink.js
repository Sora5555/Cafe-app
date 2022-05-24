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

const DrinkSchema = new Schema({
  id_drink: reqInt,
  name: reqString,
  price: reqInt,
});

const Drink = mongoose.model("drink", DrinkSchema);

module.exports = Drink;
