const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connection to MongoDB

mongoose.connect("mongodb://localhost:27017/Authentication").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(8000, () => {
    console.log("Server started on port 8000");
});

