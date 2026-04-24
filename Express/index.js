const http = require('http')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    return res.send("Hello from Home page")
})

app.get('/home', (req, res) => {
    return res.send("Hello from the Home page ")
})

app.get('/about', (req, res) => {
    return res.send(
        "Hey " + (req.query.name || "Guest") +
        " and you are " + (req.query.developer || "unknown") +
        " at your age is " + (req.query.age || "unknown")
    )
})

const myserver = http.createServer(app)
myserver.listen(8000, () => console.log("Server Started"))