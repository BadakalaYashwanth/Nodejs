const User = require("../models/User");
const bcrypt = require("bcrypt");


async function handleSingUp(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });


    return res.status(201).render("home");
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.render("login", {
            error: "Invalid Email or Password",
        });
    }
    const isMatch = await bcrypt.compare(user.password, password);
    if (!isMatch) {
        return res.render("login", {
            error: "Invalid Email or Password",
        });
    }
    return res.status(200).render("home");
}
module.exports = {
    handleSingUp,
    handleLogin
}