const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

// to get all books
router.get("/", booksController.getAllBooks);

module.exports = router;