const mongoose = require("mongoose")
const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        { timestamp: { type: Number } }
    ]
}, {
    timestamps: true,
})
// Create a Mongoose model named 'Url' using urlSchema
// This model is used to interact with the 'urls' collection in MongoDB
const Url = mongoose.model('Url', urlSchema)
module.exports = Url