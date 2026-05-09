const express = require("express");
const router = express.Router();
const { handleSingUp, handleLogin } = require("../controllers/user");


router.get("/signup", (req, res) => {
    return res.render("singup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;