const express = require("express");

const router = express.Router();

const loginRegisterController = require("../controllers/loginRegisterController");

router.get("/", loginRegisterController.get_login);
router.post("/", loginRegisterController.loginAuth);
router.delete("/logout", loginRegisterController.logout);

module.exports = router;
