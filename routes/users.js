const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const usersController = require("../controllers/users");

// to get all users
router.get("/", usersController.getAllUsers);

// to get one user
router.get("/:id", usersController.getOneUser);

// to add a user
router.post("/", validate.saveUser, usersController.addUser);

// to update a user
router.put("/:id", validate.saveUser, usersController.updateUser);

// to delete a user
router.delete("/:id", usersController.deleteUser);

module.exports = router;