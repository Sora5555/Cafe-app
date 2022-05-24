const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.get("/order", OrderController.get_order_form);
router.post("/order", OrderController.post_order_form);

module.exports = router;
