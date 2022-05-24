const Officer = require("../models/Officer");
const bcrypt = require("bcrypt");

const get_form = async (req, res) => {
  res.render("NewOfficer");
};
const post_form = async (req, res) => {
  const officer = new Officer();
  officer.username = req.body.username;
  officer.password = await bcrypt.hash(req.body.password, 10);
  officer.role = req.body.role;
  officer.last_login_date = "-";
  await officer.save();
  res.redirect("/table");
};

module.exports = {
  get_form,
  post_form,
};
