const Officer = require("../models/Officer");
const Order = require("../models/Order");
const OrderDrink = require("../models/OrderDrink");
const OrderFood = require("../models/OrderFood");

const get_table = async (req, res) => {
  const date = new Date();
  const officer = await Officer.find();
  const orders = await Order.find({
    $and: [{ date: date.getDate() }, { month: date.getMonth() + 1 }],
  });
  console.log(req.user.role);
  const orderFood = await OrderFood.find();
  const userOrder = await Order.find({ officer: req.user.username });
  const orderDrink = await OrderDrink.find();
  const daily = await Order.find({
    $and: [{ date: date.getDate() }, { month: date.getMonth() + 1 }, { status: "paid" }],
  });
  const role = req.user.role;
  const monthly = await Order.find({
    $and: [{ month: date.getMonth() + 1 }, { status: "paid" }],
  });
  const daily_revs = daily.map((rev) => rev.total_cost);
  const monthly_revs = monthly.map((rev) => rev.total_cost);
  let month_rev = monthly_revs.reduce((total, current) => total + current, 0);
  let daily_rev = daily_revs.reduce((total, current) => total + current, 0);
  Officer.updateOne(
    { username: req.user.username },
    { last_login_date: new Date().toLocaleDateString() },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
  res.render("Table", {
    orders,
    orderFood,
    orderDrink,
    month_rev,
    daily_rev,
    userOrder,
    role,
    officer,
  });
};

const update_order = async (req, res) => {
  const id = req.params.id;
  Order.updateMany({ id_order: id }, { status: "paid" }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
  res.redirect("back");
};

const delete_order = async (req, res) => {
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
  delete_item(Order);
  delete_item(OrderFood);
  delete_item(OrderDrink);

  res.redirect("back");
};

module.exports = {
  get_table,
  update_order,
  delete_order,
};
