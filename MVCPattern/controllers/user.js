const User = require("../models/user")


// GET all users from MongoDB
async function handleGetAllUser(req, res) {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

// GET user by MongoDB _id
async function handleGetUserById(req, res) {
    const foundUser = await User.findById(req.params.id)
    if (!foundUser) return res.status(404).json({ error: "User not found" })
    return res.json(foundUser)
}

// PATCH - partially update a user by MongoDB _id
async function handlePatchUserById(req, res) {
    const body = req.body;
    // Map any snake_case fields to camelCase for the schema
    const updateData = {};
    if (body.first_name)  updateData.firstName = body.first_name;
    if (body.last_name)   updateData.lastName  = body.last_name;
    if (body.job_title)   updateData.jobTitle  = body.job_title;
    if (body.email)       updateData.email     = body.email;
    if (body.gender)      updateData.gender    = body.gender;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }   // returns updated document
    )
    if (!updatedUser) return res.status(404).json({ error: "User Not Found" })
    return res.status(200).json({ status: 'Success', user: updatedUser })
}

// DELETE a user by MongoDB _id
async function handleDeleteUserById(req, res) {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) return res.status(404).json({ error: "User Not Found" })
    return res.status(200).json({ status: "User Deleted", id: req.params.id })
}

// POST - create a new user in MongoDB
async function handlePostUser(req, res) {
    const body = req.body;
    // Accept snake_case from Postman: first_name, last_name, job_title
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required: first_name, last_name, email, gender, job_title" });
    }
    // Map snake_case to camelCase to match Mongoose schema
    const newUser = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    return res.status(201).json({ status: 'Success', user: newUser })
}

// PUT - fully replace a user by MongoDB _id
async function handlePutUser(req, res) {
    const body = req.body;
    // Accept snake_case from Postman: first_name, last_name, job_title
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required for PUT: first_name, last_name, email, gender, job_title" });
    }
    // Map snake_case to camelCase to match Mongoose schema
    const replacedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        },
        { new: true, overwrite: true }
    )
    if (!replacedUser) return res.status(404).json({ error: "User Not Found" })
    return res.status(200).json({ status: 'Success', user: replacedUser })
}


module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,
    handlePostUser,
    handlePutUser
}
