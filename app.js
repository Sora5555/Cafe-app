const express = require("express");

const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");
const OrderRoutes = require("./routers/OrderRoutes");
const TableRoutes = require("./routers/TableRoutes");
const FoodRoutes = require("./routers/MenuRoutes");
const NewMenuRoutes = require("./routers/NewMenuRoutes");
const loginRegisterRoutes = require("./routers/loginRegisterRoutes");
const filteredRoutes = require("./routers/FilteredRoutes");
const officerRoutes = require("./routers/OfficerRoutes");
const editRoutes = require("./routers/EditRoutes");
const Passport = require("passport");
const session = require("express-session");
const initPassport = require("./passport-config");
const Officer = require("./models/Officer");

app.use(
  session({
    secret: "12345",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(Passport.initialize());
app.use(Passport.session());
initPassport(
  Passport,
  async (username) => {
    const user = await Officer.findOne({ username: username }).exec();
    return user;
  },
  async (id) => {
    return await Officer.findById(id).exec();
  }
);

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/cafe", () => {
  app.listen("3000", () => {
    console.log("listening to port 3000");
  });
  console.log("connected");
});

app.use(
  "/",
  OrderRoutes,
  TableRoutes,
  FoodRoutes,
  NewMenuRoutes,
  loginRegisterRoutes,
  filteredRoutes,
  editRoutes,
  officerRoutes
);
