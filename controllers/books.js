const mongodb = require("../data/database");

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

module.exports = {
    getAllBooks
};