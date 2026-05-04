const express = require('express');
const axios = require('axios');
const app = express();

const port = 8007;

app.use(express.json());

const jsonData = 'https://jsonplaceholder.typicode.com/users';

/*
  PUT /users/:id
  Purpose: update entire user
  Runs when client sends request to: http://localhost:8007/users/1
*/
app.put('/users/:id', async (req, res) => {
    try {
        // get user id from URL
        const userId = req.params.id;

        // extract data from request body
        const { name, username, email } = req.body;

        // validation → ensure full data is provided
        if (!name || !username || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // send PUT request to external API
        const response = await axios.put(`${jsonData}/${userId}`, {
            name,
            username,
            email
        });

        // axios returns full response object
        // actual updated user is inside response.data
        const updatedUser = response.data;

        // send response back to client
        res.json(updatedUser);

    } catch (error) {
        // show real error for debugging
        console.error(error.response?.data || error.message);

        res.status(500).json({
            error: error.response?.data || error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});