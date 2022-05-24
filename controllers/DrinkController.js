const Drink = require("../models/Drink");

const get_drink = async (req, res) => {
  const drink = await Drink.find();

  res.render("Drink", { drink });
};

const delete_drink = async (req, res) => {
  const id = req.params.id;
  Drink.deleteMany({ id_drink: id }, function (err, docs) {
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
  const drink = await Drink.findOne({ id_drink: id });
  console.log(await Drink.find());
  res.render("editDrink", { drink });
};

const post_edit_form = async (req, res) => {
  const id = req.params.id;
  Drink.updateMany(
    { id_drink: id },
    { $set: { name: req.body.name, price: req.body.price } },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
  res.redirect("/drink");
};

module.exports = {
  get_drink,
  delete_drink,
  get_edit_form,
  post_edit_form,
};
