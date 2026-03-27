const express = require('express');
const axios = require('axios');
const app = express();

const port = 8006;

app.use(express.json());

const jsonData = 'https://jsonplaceholder.typicode.com/users';

/*
  POST /users
  Purpose: create a new user
  Runs when client sends request to: http://localhost:8005/users
*/
app.post('/users', async (req, res) => {
    try {
        // req.body → contains data sent by client in JSON format
        // example: { name: "Yaswanth", username: "yash", email: "test@mail.com" }
        const newUser = req.body;

        // send POST request to external API
        // this sends newUser data to JSONPlaceholder server
        const response = await axios.post(jsonData, newUser);

        // axios returns full response object
        // actual created user is inside response.data
        const createdUser = response.data;

        // send response back to client
        // 201 status means "resource created"
        res.status(201).json(createdUser);

    } catch (error) {
        // this block runs if request fails (network issue, API error, etc.)

        // send error message with status 500 (server error)
        res.status(500).json({ error: 'Failed to create user' });
    }
});


app.listen(port, ()=>{
    console.log(`Server Online ${port}`);
})