const express = require('express');
const { Router } = require('express');
const router = Router();
const { handleGetAllUser, handleGetUserById, handlePatchUserById, handleDeleteUserById, handlePostUser, handlePutUser } = require('../controllers/user');


//JSON response -> HandleGetAllUser is imported from user controller.
router.get('/', handleGetAllUser)

//Get User By Id and importing from the user controller.
router.get('/:id', handleGetUserById)

//Post Request for adding a new user to the MongoDB database. imported from the user controller
router.post("/", handlePostUser)

//Patch Request for updating user from MongoDB database. imported from user controller
router.patch("/:id", handlePatchUserById)

//Put Request for replacing a user from MongoDB database. imported from the user controller
router.put("/:id", handlePutUser)

//Delete the request from the mongodb by the id, and imported from the controller.
router.delete("/:id", handleDeleteUserById)

// NEW: exporting router so it can be used in main server file
// without this, routes won't work
module.exports = router;