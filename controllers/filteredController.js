const Order = require("../models/Order");
const OrderDrink = require("../models/OrderDrink");
const OrderFood = require("../models/OrderFood");

const get_filtered = async (req, res) => {
  const id = req.params.id;
  const orders = await Order.find({ officer: id });
  const orderFood = await OrderFood.find();
  const orderDrink = await OrderDrink.find();

  res.render("Filtered", { orders, orderDrink, orderFood });
};

module.exports = {
  get_filtered,
};
