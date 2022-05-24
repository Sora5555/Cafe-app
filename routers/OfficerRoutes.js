const express = require("express");

const officerController = require("../controllers/OfficerController");

const router = express.Router();

router.get("/officer", officerController.get_form);
router.post("/officer", officerController.post_form);

module.exports = router;
