const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const OfficerSchema = new Schema({
  username: reqString,
  password: reqString,
  role: reqString,
  last_login_date: reqString,
});

const Officer = mongoose.model("officer", OfficerSchema);

module.exports = Officer;
