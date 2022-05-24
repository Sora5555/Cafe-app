const Menu = require("../models/Menu");
const OrderDrink = require("../models/OrderDrink");
const OrderFood = require("../models/OrderFood");
const Order = require("../models/Order");

const get_edit = async (req, res) => {
  const id = req.params.id;
  const menu = await Menu.find();
  const orderfood = await OrderFood.find({ id_order: id });
  const orderdrink = await OrderDrink.find({ id_order: id });
  console.log(orderdrink, orderfood);
  res.render("edit", { menu, orderfood, orderdrink });
};
const post_edit = async (req, res) => {
  const id = req.params.id;
  function delete_item(coll) {
    coll.deleteMany({ id_order: id }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    });
  }
  delete_item(OrderDrink);
  delete_item(OrderFood);
  const orderArr = [];
  for (i = 0; i < req.body.menu.length; i++) {
    let type;
    let item = (await Menu.findOne({ name: req.body.menu[i].name })).category;
    if (req.body.menu[i].quantity != 0 && item === "minuman") {
      type = new OrderDrink();
      console.log("minum", req.body.menu[i].quantity);
      type.id_order = id;
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
      type.id_order = id;
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
  const OrderDrink_arr = await OrderDrink.find({ id_order: id });
  const OrderFood_arr = await OrderFood.find({ id_order: id });
  const food_arr_price = OrderFood_arr.map((price) => price.price);
  const drink_arr_price = OrderDrink_arr.map((price) => price.price);
  const drink_total = drink_arr_price.reduce((total, price) => (total += price), 0);
  const food_total = food_arr_price.reduce((total, price) => (total += price), 0);
  const cost = drink_total + food_total;
  Order.updateMany({ id_order: id }, { total_cost: cost }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
  res.redirect("/table");
};
module.exports = {
  get_edit,
  post_edit,
};
