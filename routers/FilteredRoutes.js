const express = require("express");

const router = express.Router();

const FilteredController = require("../controllers/filteredController");

router.get("/filtered/:id", FilteredController.get_filtered);

module.exports = router;
