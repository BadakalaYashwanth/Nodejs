const { customAlphabet } = require('nanoid')
const URL = require('../models/url')


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body
    if (!body || !body.url)
        return res.status(400).json({ error: 'url is required' })

    // Prevent duplicates: Check if we already shortened this original URL
    const existingUrl = await URL.findOne({ redirectURL: body.url });
    if (existingUrl) {
        const allUrls = await URL.find({});
        return res.render("home", {
            id: existingUrl.shortID,
            urls: allUrls
        });
    }

    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 8)
    const shortID = nanoid()
    await URL.create({
        shortID: shortID,
        redirectURL: req.body.url,
        visitHistory: []
    })
    const allUrls = await URL.find({});
    return res.render("home", {
        id: shortID,
        urls: allUrls
    });
}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortID: shortId }); // find by shortId from URL param
    return res.status(200).json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory
    })

}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}