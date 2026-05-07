const { customAlphabet } = require('nanoid')
const URL = require('../models/url')


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body
    if (!body || !body.url)
        return res.status(400).json({ error: 'url is required' })
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 8)
    const shortID = nanoid()
    await URL.create({
        shortID: shortID,
        redirectURL: req.body.url,
        visitHistory: []
    })
    return res.json({ shortURL: shortID })
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