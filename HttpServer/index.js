const http = require('http'); 
// Import Node.js built-in HTTP module to create a server

// Create the server
const myServer = http.createServer((req, res) => {
    // This function runs every time a client makes a request

    console.log(req.headers);
    // Logs all incoming request headers, useful for debugging but too verbose for production

    console.log(`New request received at ${new Date().toLocaleString('en-IN')}`); 
    // Logs the exact time when the request hit the server

    res.end("Hello from the server"); 
    // Sends response back to the client and closes the connection
});

// Start the server on port 8009
myServer.listen(8009, () => {
    console.log("Server started on port 8009"); 
    // Executes once when the server begins listening for incoming requests
});