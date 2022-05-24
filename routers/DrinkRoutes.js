const express = require("express");

const router = express.Router();
const drinkController = require("../controllers/DrinkController");

router.get("/drink", drinkController.get_drink);
router.delete("/remove_drink/:id", drinkController.delete_drink);
router.get("/edit-drink/:id", drinkController.get_edit_form);
router.post("/edit-drink/:id", drinkController.post_edit_form);

module.exports = router;
