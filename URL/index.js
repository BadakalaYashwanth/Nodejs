const http = require('http');
// Module to create server

const fs = require('fs');
// Module to handle file operations (logging)

const url = require('url');
// Module to parse request URLs

const port = 8003;
// Centralized port configuration

const myServer = http.createServer((req, res) => {
    // Runs on every request

    const log = `${new Date().toLocaleString('en-IN')}: ${req.url} New Req Received\n`;
    // Create readable log entry

    const myUrl = url.parse(req.url, true);
    // Parse URL into pathname and query object

    console.log(myUrl);
    // Debug full URL structure, remove later in production

    fs.appendFile("log.txt", log, (err) => {
        if (err) console.error("Log write failed");
    });
    // Async logging, does not block response

    switch (myUrl.pathname) {
        case "/":
            res.end("HomePage");
            break;

        case "/about":
            const username = myUrl.query.myname;
            // Extract query parameter

            res.end(`I am ${username || "Guest"}`);
            // Fallback to "Guest" if query missing
            break;

        default:
            res.statusCode = 404;
            res.end("404 Not Found");
            // Handle unknown routes properly
    }
});

myServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // Confirms server startup
});