const fs = require('fs');
const http = require('http');

const port = 8001;
// Define port once, reuse everywhere

const myServer = http.createServer((req, res) => {

    fs.appendFile('ServerCall.txt',
        `\nRequest at ${req.url}, ${req.headers}, ${new Date().toLocaleString('en-IN')}`,
        (err) => {
            if (err) {
                console.error("Failed to write log");
            }
        }
    );
    // Log request asynchronously, don't block response
    
    res.end(`Server Online ${port}`);
    // Respond immediately, independent of logging
});

myServer.listen(port, () => {
    console.log(`Server Online ${port}`);
});