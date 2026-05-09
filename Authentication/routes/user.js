const express = require("express");
const { handleSingUp, handleLogin } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleSingUp);
router.post("/login", handleLogin);
module.exports = router;