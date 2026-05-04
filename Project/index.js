const express = require("express");
const app = express();
const PORT = 8000;
const fs = require('fs')

//creating a middleware 
app.use(express.urlencoded({ extended: false })) //This is used to parse the data coming from the frontend
app.use(express.json()); // This is used to parse JSON data coming from the frontend
let user = require("./MOCK_DATA.json");

// JSON response
app.get('/api/users', (req, res) => {
    return res.status(200).json(user); // 200 means OK, request was successful
});

// HTML response
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${user.map(u => `<li>${u.first_name}</li>`).join("")}
        </ul>
    `;
    res.status(200).send(html); // 200 means OK, the page is loading correctly
});

app.get('/api/users/:id', (req, res) => {

    // Get the id from URL and convert it from string to number
    const id = Number(req.params.id);

    // Find the user in the array whose id matches the given id
    const result = user.find((u) => u.id === id);

    // If user is not found
    if (!result) {
        return res.status(404).json({ error: "User Not Found" }); // 404 means Not Found, the user doesn't exist
    }

    // Send the found user as JSON response
    return res.status(200).json(result); // 200 means OK, user data found successfully
});


app.post("/api/users", (req, res) => {
    const body = req.body // This stores the data coming from the frontend
    
    // Check if body is empty or missing data (Simple validation)
    if(!body || !body.first_name) {
        return res.status(400).json({ msg: "First Name is required" }); // 400 means Bad Request, user sent incomplete data
    }

    user.push({ ...body, id: user.length + 1 }) // Adding the new data to our list
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user))

    return res.status(201).json({ status: 'Success', id: user.length }) // 201 means Created, a new user was successfully added
})



// PATCH API route
// Purpose: Update selected user details using user id from URL
app.patch("/api/users/:id", (req, res) => {

    // Get id from URL params
    // Example: /api/users/5 gives "5"
    // Number() converts string to number
    const id = Number(req.params.id)

    // find() checks array one by one
    // Returns first matching user object
    // u is temporary variable for each user
    const finduser = user.find(u => u.id === id)

    // If no matching user found
    if (!finduser) {
        return res.status(404).json({ // 404 means Not Found, we couldn't find the user to update
            error: "User Not Found"
        })
    }

    // Update user data with values from request body
    // We update the fields sent in the request body
    Object.assign(finduser, req.body);

    // Save the updated users list back to the JSON file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user));

    // Send success response
    res.status(200).json({ // 200 means OK, the user was updated successfully
        status: 'Success'
    })

})


// PUT API route
// Purpose: Replace the entire user object with new data from URL id
app.put("/api/users/:id", (req, res) => {
    // Get the id from URL
    const id = Number(req.params.id);

    // Find the index of the user in the array
    const index = user.findIndex(u => u.id === id);

    // If user not found, return 404
    if (index === -1) {
        return res.status(404).json({ error: "User Not Found" }); // 404 means Not Found, we couldn't find the user to replace
    }

    // Replace the entire object at that index
    user[index] = { ...req.body, id: id };

    // Save the updated list back to the JSON file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user));

    return res.status(200).json({ status: 'Success', id: id }); // 200 means OK, user replaced successfully
});




// DELETE API route
// Purpose: Remove a user from the users array using the id from URL
app.delete("/api/users/:id", (req, res) => {

    // Get the id value from request URL params
    // Example: /api/users/3 gives req.params.id = "3"
    // Number() converts string "3" into number 3
    const id = Number(req.params.id)

    // filter() checks each user in the array
    // Keeps only users whose id is NOT equal to the given id
    // Matching user gets removed from array
    user = user.filter((u) => u.id !== id);

    // Save the updated users list back to the JSON file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user));

    // Send success response to client
    res.status(200).json({ // 200 means OK, the user was deleted successfully
        status: "User Deleted",
        id: id
    })

})



app.listen(PORT, () => {
    console.log(`Server Online ${PORT}`);
});