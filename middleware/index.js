const express = require("express");
const app = express();
const PORT = 8000;
const fs = require('fs')

app.use(express.json()); // This is used to parse JSON data coming from the frontend
let user = require("./MOCK_DATA.json");

//creating a middleware and 1st middleware
app.use(express.urlencoded({ extended: false })) //This is used to parse the data coming from the frontend


//29-04-2026, CODE ON MIDDLEWARE, the next--> is middleware
//2nd middleware, it only executes when the 1st middleware is passed
app.use((req, res, next) => {
    console.log("Hello from the Middleware ")

    next() //next() passes control to the next middleware or route handler
    //After this 1st middleware, request goes to the next middleware below
})


//29-04-2026, CODE ON MIDDLEWARE, the next--> is middleware
//3rd middleware, it executes after the above middleware calls next()
app.use((req, res, next) => {
    console.log("Hello from the Middleware 2")

    next() //next() passes control to the next middleware
    //After this middleware, request goes to the next middleware below
})


//29-04-2026, CODE ON MIDDLEWARE, the next--> is middleware
//4th middleware, it executes after the above middleware calls next()
//Using the FS Module
app.use((req, res, next) => {
    fs.appendFile(
        'log.txt',

        // new Date() creates current date and time
        // toLocaleString('en-IN') shows date and time in Indian format
        // req.ip gives user IP address
        // req.method gives request type like GET, POST
        // req.path gives requested route path
        `\n${new Date().toLocaleString('en-IN')}: ${req.ip} ${req.method}: ${req.path}\n`,

        (err, data) => {

            next() //After log file work is completed, request moves to routes
        }
    )
})

// JSON response
app.get('/api/users', (req, res) => {
    return res.json(user);
});



// HTML response
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${user.map(u => `<li>${u.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

app.get('/api/users/:id', (req, res) => {

    // Get the id from URL and convert it from string to number
    const id = Number(req.params.id);

    // Find the user in the array whose id matches the given id
    // "user" (top) is your JSON array
    // "u" is each item in that array
    const result = user.find((u) => u.id === id);

    // If user not found
    if (!result) {
        return res.status(404).json({ error: "User Not Found" });
    }

    // Send the found user as JSON response
    return res.json(result);
});


app.post("/api/users", (req, res) => {
    const body = req.body //This store the data coming from the frontend
    console.log(body);   //Printing the data coming from the frontend in the terminal

    user.push({ ...body, id: user.length + 1 }) //Adding the frontend upcoming data into the JSON data, and the user.length+1 is used to give the id to the new data
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user, null, 2))

    return res.json({ status: 'Success', id: user.length }) //Seding a response to the frontend
})



// PATCH API route
// Purpose: Update selected user details using user id from URL
app.patch("/api/users/:id", (req, res) => {

    // Get id from URL params
    const id = Number(req.params.id)

    // Returns first matching user object
    const finduser = user.find(u => u.id === id)

    // If no matching user found
    if (!finduser) {
        return res.status(404).json({
            error: "User Not Found"
        })
    }

    // Update user data with values from request body
    Object.assign(finduser, req.body);

    // Save the updated users list back to the JSON file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user, null, 2));

    // Send success response
    res.status(200).json({
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
        return res.status(404).json({ error: "User Not Found" });
    }

    // Replace the entire object at that index
    //...req.body means copy all fields from request body into a new object. Then your code adds the correct id.
    user[index] = { ...req.body, id: id };

    // Save the updated list back to the JSON file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user, null, 2));

    return res.json({ status: 'Success', id: id });
});




// DELETE API route
// Purpose: Remove a user from the users array using the id from URL
app.delete("/api/users/:id", (req, res) => {

    // Get the id value from request URL params
    const id = Number(req.params.id)

    // Find user first
    const finduser = user.find((u) => u.id === id);

    // If not found
    if (!finduser) {
        return res.status(404).json({
            error: "User Not Found"
        })
    }

    // Matching user gets removed from array
    user = user.filter((u) => u.id !== id);

    // Save the updated users list back to the JSON file
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(user, null, 2));

    // Send success response to client
    res.status(200).json({
        status: "User Deleted",
        id: id
    })
})



app.listen(PORT, () => {
    console.log(`Server Online ${PORT}`);
});