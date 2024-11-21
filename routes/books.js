const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const booksController = require("../controllers/books");

// to get all books
router.get("/", booksController.getAllBooks);

// to get one book
router.get("/:id", validate.validateId, booksController.getOneBook);

// to add a book
router.post("/", validate.saveBook, booksController.addBook);

// to update a book
router.put("/:id", validate.validateId, validate.saveBook, booksController.updateBook);

// to delete a book
router.delete("/:id", validate.validateId, booksController.deleteBook);

module.exports = router;