const Menu = require("../models/Menu");
const Order = require("../models/Order");

const get_menu = async (req, res) => {
  const menu = await Menu.find();
  const date = new Date();
  const order = await Order.find({
    $and: [{ date: date.getDate() }, { month: date.getMonth() + 1 }],
  });
  console.log(menu);
  res.render("Menu", { menu });
};

const delete_menu = async (req, res) => {
  const id = req.params.id;
  Menu.deleteMany({ id_menu: id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
    }
  });
  res.redirect("back");
};

const get_edit_form = async (req, res) => {
  const id = parseInt(req.params.id);
  const menu = await Menu.findOne({ id_menu: id });
  res.render("editMenu", { menu });
};

const post_edit_form = async (req, res) => {
  const id = req.params.id;
  Menu.updateMany(
    { id_menu: id },
    { $set: { stock: req.body.stock, name: req.body.name, price: req.body.price } },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
  res.redirect("/menu");
};

module.exports = {
  get_menu,
  delete_menu,
  get_edit_form,
  post_edit_form,
};
