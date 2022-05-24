const express = require("express");

const router = express.Router();

const MenuController = require("../controllers/MenuController");

router.get("/menu", MenuController.get_menu);
router.delete("/remove_menu/:id", MenuController.delete_menu);
router.get("/edit-menu/:id", MenuController.get_edit_form);
router.post("/edit-menu/:id", MenuController.post_edit_form);

module.exports = router;
