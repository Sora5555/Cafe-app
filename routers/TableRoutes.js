const express = require("express");
const TableController = require("../controllers/TableController");
const loginRegisterController = require("../controllers/loginRegisterController");

const router = express.Router();

router.get(
  "/table",
  loginRegisterController.isAuthenthicated,
  TableController.get_table
);
router.post("/update/:id", TableController.update_order);
router.delete("/delete/:id", TableController.delete_order);

module.exports = router;
