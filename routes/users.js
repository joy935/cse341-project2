const express = require("express");
const router = express.Router();
// add validation
const usersController = require("../controllers/users");

// to get all users
router.get("/", usersController.getAllUsers);

// to get one user
router.get("/:id", usersController.getOneUser);

// to add a user
router.post("/", usersController.addUser);

// to update a user
router.put("/:id", usersController.updateUser);

// to delete a user
router.delete("/:id", usersController.deleteUser);

module.exports = router;