const express = require("express");

const router = express.Router();

const editController = require("../controllers/EditController");

router.get("/edit/:id", editController.get_edit);
router.post("/edit/:id", editController.post_edit);

module.exports = router;
