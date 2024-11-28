const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const booksController = require("../controllers/books");
const { isAuthenticated } = require("../middleware/authenticate");

// to get all books
router.get("/", booksController.getAllBooks);

// to get one book
router.get("/:id", validate.validateId, booksController.getOneBook);

// to add a book
router.post("/", isAuthenticated, validate.saveBook, booksController.addBook);

// to update a book
router.put("/:id", isAuthenticated, validate.validateId, validate.saveBook, booksController.updateBook);

// to delete a book
router.delete("/:id", isAuthenticated, validate.validateId, booksController.deleteBook);

module.exports = router;