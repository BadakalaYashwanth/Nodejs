const express = require('express');
const app = express();
const PORT = 8000;
const fs = require("fs")
const connectToMongoDB = require("./connection");

//Importing the routes 
const userRouter = require("./routes/user");

//Importing the middlewares
const { log_request_response_middleware } = require("./middlewares/middlewareindex");
app.use(express.json()); // Parse JSON request body (Content-Type: application/json)
app.use(express.urlencoded({ extended: false })); // Parse form request body (Content-Type: x-www-form-urlencoded)
app.use(log_request_response_middleware("log-file.txt"));

//Connecting to MongoDB
connectToMongoDB("mongodb://localhost:27017/employeesdb")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

//All Routes are defined here and imported from user.js file 
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})