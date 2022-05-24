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

const MenuSchema = new Schema({
  id_menu: reqInt,
  name: reqString,
  price: reqInt,
  stock: reqInt,
  category: reqString,
});

const Menu = mongoose.model("menu", MenuSchema);

module.exports = Menu;
