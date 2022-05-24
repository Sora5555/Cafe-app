const Menu = require("../models/Menu");

const get_form = async (req, res) => {
  res.render("NewMenu");
};

const add_item = async (req, res) => {
  const type = new Menu();
  const menu = await Menu.find({}).sort({ id_menu: -1 });
  if (menu.length === 0) {
    type.id_menu = 1;
  } else {
    type.id_menu = menu.map((id) => id.id_menu)[0] + 1;
  }
  type.name = req.body.name;
  type.price = req.body.price;
  console.log(req.body.type);
  if (req.body.type === "drink") {
    type.category = "minuman";
  } else {
    type.category = "makanan";
  }
  await type.save();
  res.redirect(`/menu`);
};

module.exports = {
  get_form,
  add_item,
};
