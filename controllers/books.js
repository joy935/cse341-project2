const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllBooks = async (req, res) => {
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
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection("books").find({ _id: bookId });
        result.toArray().then((books) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(books[0]);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the book.");
    }
};

const addBook = async (req, res) => {
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
};

const updateBook = async (req, res) => {
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
};

const deleteBook = async (req, res) => {
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
};

module.exports = {
    getAllBooks,
    getOneBook,
    addBook,
    updateBook,
    deleteBook
};