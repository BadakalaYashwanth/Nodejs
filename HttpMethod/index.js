// import express → used to create server and APIs
const express = require('express');

// import axios → used to call external APIs
const axios = require('axios');

// create express application (your backend server instance)
const application = express();

// define port number where server will run
const port = 8005;

// middleware → converts incoming JSON request body into JavaScript object
// runs before every request
application.use(express.json());

// store external API URL (avoid repeating the same string everywhere)
const jsonData = 'https://jsonplaceholder.typicode.com/users';

// cache variable → stores API data after first fetch
let cachedUsers = null;


/*
  GET /id
  Purpose: return only user IDs
  Runs when client hits: http://localhost:8005/id
*/
application.get('/id', async (req, res) => {
    try {
        // call external API → sends request to JSONPlaceholder
        // reuse cached data if available
        if (!cachedUsers) {
            const response = await axios.get(jsonData);
            cachedUsers = response.data;
        }

        // axios returns full object → actual data is inside response.data
        const users = cachedUsers;

        // loop through users array → pick only id from each user
        const userIds = users.map((user) => user.id);

        // send result back to client as JSON
        // this also ends the request
        res.json(userIds);

    } catch (error) {
        // runs only if API call fails or something breaks

        // send error response with status 500 (server error)
        res.status(500).json({ error: 'Failed to Fetch Data' });
    }
});


/*
  GET /users/username
  Purpose: return only usernames
  Runs when client hits: http://localhost:8005/users/username
*/
application.get('/users/username', async (req, res) => {
    try {
        // fetch users again from external API
        // reuse cached data if available
        if (!cachedUsers) {
            const response = await axios.get(jsonData);
            cachedUsers = response.data;
        }

        // extract actual users array
        const users = cachedUsers;

        // loop through users → extract only username field
        const usernames = users.map((user) => user.username);

        // send usernames to client
        res.json(usernames);

    } catch (error) {
        // handle failure case

        res.status(500).json({ error: 'Failed to Fetch Data' });
    }
});


// start server → makes your app listen for incoming requests
application.listen(port, () => {
    // prints message in terminal when server starts
    console.log(`Server is running on port ${port}`);
});