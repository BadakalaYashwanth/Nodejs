// import express → used to create server and APIs
const express = require('express');

// import axios → used to call external APIs
const axios = require('axios');

// create express application (your backend server instance)
const app = express();

// define port number where server will run
const port = 8008;

// middleware → converts incoming JSON request body into JavaScript object
// runs before every request
app.use(express.json());

// store external API URL (avoid repeating the same string everywhere)
const jsonData = 'https://jsonplaceholder.typicode.com/users';


/*
  PATCH /users/:id
  Purpose: update partial user data
  Runs when client sends request to: http://localhost:8008/users/1
*/
app.patch('/users/:id', async (req, res) => {
    try {
        // get user id from URL
        const userId = req.params.id;

        // req.body → contains only fields to update
        const updates = req.body;

        // validation → ensure at least one field is provided
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No data provided for update' });
        }

        // send PATCH request to external API
        // this updates only provided fields
        const response = await axios.patch(`${jsonData}/${userId}`, updates);

        // axios returns full response object
        // actual updated user is inside response.data
        const updatedUser = response.data;

        // send response back to client
        res.json(updatedUser);

    } catch (error) {
        // this block runs if request fails

        // print actual error for debugging
        console.error(error.response?.data || error.message);

        // send error response with status 500
        res.status(500).json({
            error: error.response?.data || error.message
        });
    }
});


// start server → makes your app listen for incoming requests
app.listen(port, () => {
    // prints message in terminal when server starts
    console.log(`Server running on port ${port}`);
});