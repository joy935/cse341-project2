const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllBooks = async (req, res) => {
    // #swagger.tags = ['Books']
    try {
        const result = await mongodb.getDb().db().collection("books").find();
        result.toArray().then((books) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(books);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the books.");
    }
};

const getOneBook = async (req, res) => {
    // #swagger.tags = ['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        if (!bookId) {
            res.status(500).json("Book ID not found.");
        }
        const result = await mongodb.getDb().db().collection("books").find({ _id: bookId });
        if (!result) {
            res.status(404).json("Book not found.");
        }
        result.toArray().then((books) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(books[0]);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the book.");
    }
};

const addBook = async (req, res) => {
    // #swagger.tags = ['Books']
    try {
        const book = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            publishedDate: req.body.publishedDate,
            genre: req.body.genre
        };
        const response = await mongodb.getDb().db().collection("books").insertOne(book);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json("Some error occurred while adding the book.");
        }
    } catch (error) {
        res.status(500).json(error || "An unexpected error occurred.");
    }
};

const updateBook = async (req, res) => {
    // #swagger.tags = ['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        if (!bookId) {
            res.status(500).json("Book ID not found.");
        }
        const book = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            publishedDate: req.body.publishedDate,
            genre: req.body.genre
        };
        const response = await mongodb.getDb().db().collection("books").replaceOne({ _id: bookId }, book);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json("Some error occurred while updating the book.");
        }
    } catch (error) {
        res.status(500).json(error || "An unexpected error occurred.");
    }
};

const deleteBook = async (req, res) => {
    // #swagger.tags = ['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        if (!bookId) {
            res.status(500).json("Book ID not found.");
        }
        const response = await mongodb.getDb().db().collection("books").deleteOne({ _id: bookId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json("Some error occurred while deleting the book.");
        }
    } catch (error) {
        res.status(500).json(error || "An unexpected error occurred.");
    }
};

module.exports = {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook,
    deleteBook
};