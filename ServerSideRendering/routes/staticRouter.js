const express = require("express");
const URL = require("../models/url"); // Import the missing URL model
const router = express.Router();

// Changed "/home" to "/" because in index.js this router is mounted at "/home"
// So, navigating to "/home" will match this route.
router.get("/", async (req, res) => {
    const allUrls = await URL.find({});
    return res.status(200).render("home", {
        urls: allUrls
    });
});

module.exports = router;