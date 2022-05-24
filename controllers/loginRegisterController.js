const Passport = require("passport");

const get_login = async (req, res) => {
  res.render("Login");
};

const loginAuth = Passport.authenticate("local", {
  successRedirect: "/table",
  failureRedirect: "/",
  failureFlash: true,
});

const isAuthenthicated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
const isNotAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/table");
  }
  return next();
};
const logout = async (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  loginAuth,
  get_login,
  isAuthenthicated,
  isNotAuthenticated,
  logout,
};
