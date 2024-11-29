const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const result = await mongodb.getDb().db().collection("users").find();
        result.toArray().then((users) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the users.");
    }
};

const getOneUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const userId = new ObjectId(req.params.id);
        if (!userId) {
            res.status(500).json("User ID not found.");
        }
        const result = await mongodb.getDb().db().collection("users").find({ _id: userId });
        if (!result) {
            res.status(404).json("User not found.");
        }
        result.toArray().then((users) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users[0]);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the user.");
    }
};

const addUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteBooks: req.body.favoriteBooks,
            githubId: req.body.githubId,
            username: req.body.username
        };
        const response = await mongodb.getDb().db().collection("users").insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json("Some error occurred while adding the user.");
        }
    } catch (error) {
        res.status(500).json(error || "An unexpected error occurred.");
    }
};

const updateUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const loggedInUser = req.session.user;
        if (!loggedInUser) {
            return res.status(401).json("You must be logged in to update a user");
        }
        const userId = new ObjectId(req.params.id);
        const existingUser = await mongodb.getDb().db().collection("users").findOne({ _id: userId }); // check if the user exists
        if (!existingUser || existingUser.githubId !== loggedInUser.githubId) {
            return res.status(403).json("You are not authorized to update this user");
        }
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteBooks: req.body.favoriteBooks,
            githubId: req.body.githubId,
            username: req.body.username
        };
        const response = await mongodb.getDb().db().collection("users").replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json("Some error occurred while updating the user.");
        }
    } catch (error) {
        res.status(500).json(error || "An unexpected error occurred.");
    }
};

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const loggedInUser = req.session.user;
        if (!loggedInUser) {
            return res.status(401).json("You must be logged in to update a user");
        }
        const userId = new ObjectId(req.params.id);
        const existingUser = await mongodb.getDb().db().collection("users").findOne({ _id: userId }); // check if the user exists
        if (!existingUser || existingUser.githubId !== loggedInUser.githubId) {
            return res.status(403).json("You are not authorized to update this user");
        }
        const response = await mongodb.getDb().db().collection("users").deleteOne({ _id: userId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json("Some error occurred while deleting the user.");
        }
    } catch (error) {
        res.status(500).json(error || "An unexpected error occurred.");
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    addUser,
    updateUser,
    deleteUser
};