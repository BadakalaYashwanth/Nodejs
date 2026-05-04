const express = require("express");
const app = express();
const PORT = 8000;
const fs = require('fs')
const mongoose = require('mongoose')

//Connecting the mongoose 
mongoose.connect('mongodb://localhost:27017/employeesdb')

    //Creating Promise
    .then(() => console.log('MongoDB Online --> Connected'))
    .catch(err => console.log('Failed to connect to MongoDB: ' + err.message))


//We are creating SCHEMA, well schema -->Define the strucutre 
const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true //Check if the user creating multiple account using the same email id
        },
        gender: {
            type: String,
            required: true
        },
        job_title: {
            type: String,
            required: true
        }
    },
    { timestamps: true } //This tells that every time a user is created or updated, it will store the time
)

//We are creating Model
// 'user' --> collection name in MongoDB (stored as 'users')
const User = mongoose.model('user', userSchema)


app.use(express.json()); // This is used to parse JSON data coming from the frontend

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


// GET all users from MongoDB
// async --> allows us to use await inside the function
app.get('/api/users', async (req, res) => {
    console.log(req.headers) //Read the headers and give the output in the terminal
    //Custom headers --> x-header-name
    res.setHeader("x-myName", "Yashwanth"); //The response will be getting a header, Custom header

    // User.find({}) --> fetch ALL documents from the 'users' collection in MongoDB
    const allUsers = await User.find({})
    return res.json(allUsers);
});



// HTML response - shows all users as a list
// async --> allows us to use await inside
// Getting the data from the Mongodb
app.get('/users', async (req, res) => {

    // Fetch all users from MongoDB
    const allUsers = await User.find({})  //{} --> All users
    //On checking the localhost:8000/users we will get the firstname and lastname
    const html = `
        <ul>
            ${allUsers.map(u => `<li>${u.first_name} ${u.last_name} - ${u.email}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});


// GET single user by MongoDB _id
app.get('/api/users/:id', async (req, res) => {

    // No need to fetch all users here - we only need the one with matching id

    // On checking the localhost:8000/api/users/:id we will get the data of the user with the id 
    // Get the id from URL
    // MongoDB uses _id (string), no need to convert to Number
    const id = req.params.id;

    // User.findById(id) --> Find one document by its MongoDB _id
    const result = await User.findById(id)

    // If user not found
    if (!result) {
        return res.status(404).json({ error: "User Not Found" });
    }

    // Send the found user as JSON response
    // Send ONLY the found user (not all users)
    return res.json(result);
});

//cehck the output in the postman
// POST - Create a new user and save to MongoDB
app.post("/api/users", async (req, res) => {
    const body = req.body // This stores the data coming from the frontend
    console.log(body);   // Printing the data coming from the frontend in the terminal

    // Check if all required fields are provided
    if (!body.first_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ error: "All fields are required" })
    }
    // User.create() --> saves new document to MongoDB and returns the saved document
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    console.log("Result", result) // Prints the newly created user from MongoDB
    return res.status(201).json({ message: "User Created Successfully", id: result._id })

})



// PATCH API route
// Purpose: Update selected user details using MongoDB _id from URL
app.patch("/api/users/:id", async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, { last_name: "Changed" })
    return res.json({
        status: "success",
        message: "User Updated Successfully"
    })
})


// PUT API route
// Purpose: Replace the entire user object with new data from URL _id
app.put("/api/users/:id", async (req, res) => {

    // Get the id from URL
    const id = req.params.id;

    // User.findByIdAndUpdate() with overwrite option replaces the full document
    // { new: true } --> returns the updated document
    // { overwrite: true } --> replaces the entire document (like PUT behavior)
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, overwrite: true })

    // If user not found, return 404
    if (!updatedUser) {
        return res.status(404).json({ error: "User Not Found" });
    }

    return res.json({ status: 'Success', id: updatedUser._id });
});


// DELETE API route
// Purpose: Remove a user from MongoDB using the _id from URL
//Check the delete method in the postman
app.delete("/api/users/:id", async (req, res) => {

    await User.findByIdAndDelete(req.params.id)
    return res.json({
        status: "success",
        message: "User Deleted Successfully"
    })
})



app.listen(PORT, () => {
    console.log(`Server Online ${PORT}`);
});