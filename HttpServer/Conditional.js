const http = require('http');
const fs = require('fs');

const port = 8002;

const serverOnline = http.createServer((req, res) => {

    const time = new Date().toLocaleString('en-IN');
    console.log(time);
    // Log request time

    fs.appendFile(
        'Condition-Call-Logs.txt',
        `\nClient Request at ${time} -> ${req.method} ${req.url}`,
        (err) => {
            if (err) console.error("Log write failed");
        }
    );
    // Async logging, don't block response

    switch (req.url) {
        case '/':
            res.end("Homepage");
            break;

        case '/about':
            res.end(`About page at ${time}`);
            break;

        default:
            res.statusCode = 404;
            res.end("404 Not Found");
    }

});

serverOnline.listen(port, () => {
    console.log(`Server running on port ${port}`);
});