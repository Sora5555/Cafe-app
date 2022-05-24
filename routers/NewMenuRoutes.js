const express = require("express");

const router = express.Router();

const NewMenuController = require("../controllers/NewMenuController");

router.get("/new-menu", NewMenuController.get_form);
router.post("/new-menu", NewMenuController.add_item);

module.exports = router;
