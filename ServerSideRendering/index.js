const express = require("express");
const app = express();
const PORT = 8001;

// Import the URL model to interact with the 'urls' MongoDB collection
const URL = require("./models/url.js")

// Import the URL router (handles POST /url route)
const urlRoute = require('./routes/url.js')

// Import the function to connect to MongoDB
const connectToMongoDB = require("./connect.js");

// Connect to local MongoDB database named 'urlshortner'
connectToMongoDB('mongodb://localhost:27017/urlshortner')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log('Error : ' + err));

// Middleware to parse incoming JSON request bodies (req.body)
app.use(express.json());

// Mount the URL routes — handles POST /url to create a short URL
app.use('/url', urlRoute);

// Route to handle redirect: when user visits /:shortId
// It finds the matching URL in DB, records the visit, and redirects
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId; // extract shortId from URL path

    // Find the document with matching shortID and push current timestamp to visitHistory
    const entry = await URL.findOneAndUpdate(
        { shortID: shortId },           // find document where shortID matches
        { $push: { visitHistory: { timestamp: Date.now() } } }, // record the visit
        { new: true }                   // return the updated document
    );

    // Redirect the user to the original long URL
    res.redirect(entry.redirectURL);
});

// Start the Express server on PORT 8001
app.listen(PORT, () =>
    console.log("Server is running on port", PORT)
)
 