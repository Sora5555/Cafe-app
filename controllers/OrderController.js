const randomstring = require("randomstring");
const Menu = require("../models/Menu");
const Order = require("../models/Order");
const Table = require("../models/Table");
const OrderFood = require("../models/OrderFood");
const OrderDrink = require("../models/OrderDrink");

const get_order_form = async (req, res) => {
  const menu = await Menu.find();
  res.render("Order", { menu });
};
const post_order_form = async (req, res) => {
  const order = new Order();
  const date = new Date();
  order.id_order = randomstring.generate();
  order.id_table = (
    await Table.findOne({
      id_table: {
        $nin: (await Order.find({ status: "not paid" })).map((table) => table.id_table),
      },
    }).sort({ id_table: 1 })
  ).id_table;
  order.month = date.getMonth() + 1;
  order.date = date.getDate();
  order.total_cost = 0;
  order.notes = req.body.notes;
  order.officer = req.user.username;
  order.status = "not paid";
  console.log(req.body.menu[0].quantity, await Menu.find({ name: req.body.menu[0].name }).category, req.body.menu[0].name);
  await order.save();
  const orderArr = [];
  for (i = 0; i < req.body.menu.length; i++) {
    let type;
    let item = (await Menu.findOne({ name: req.body.menu[i].name })).category;
    if (req.body.menu[i].quantity != 0 && item === "minuman") {
      type = new OrderDrink();
      console.log("minum", req.body.menu[i].quantity);
      type.id_order = order.id_order;
      type.name = req.body.menu[i].name;
      type.quantity = req.body.menu[i].quantity;
      const stockCurrent = (await Menu.findOne({ name: req.body.menu[i].name })).stock - type.quantity;
      Menu.updateMany({ name: type.name }, { stock: stockCurrent }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      });
      type.price = (await Menu.findOne({ name: type.name })).price * type.quantity;
      orderArr.push(type.save());
    } else if (req.body.menu[i].quantity != 0 && item === "makanan") {
      type = new OrderFood();
      console.log("makanan", req.body.menu[i].quantity);
      type.id_order = order.id_order;
      type.name = req.body.menu[i].name;
      type.quantity = req.body.menu[i].quantity;
      const stockCurrent = (await Menu.findOne({ name: req.body.menu[i].name })).stock - type.quantity;
      Menu.updateMany({ name: type.name }, { stock: stockCurrent }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      });
      type.price = (await Menu.findOne({ name: type.name })).price * type.quantity;
      orderArr.push(type.save());
    }
  }
  await Promise.all(orderArr);
  const OrderDrink_arr = await OrderDrink.find({ id_order: order.id_order });
  const OrderFood_arr = await OrderFood.find({ id_order: order.id_order });
  const food_arr_price = OrderFood_arr.map((price) => price.price);
  const drink_arr_price = OrderDrink_arr.map((price) => price.price);
  const drink_total = drink_arr_price.reduce((total, price) => (total += price), 0);
  const food_total = food_arr_price.reduce((total, price) => (total += price), 0);
  const cost = drink_total + food_total;
  Order.updateMany({ id_order: order.id_order }, { total_cost: cost }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
  res.redirect("/table");
};

module.exports = {
  get_order_form,
  post_order_form,
};
