const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello World");
    });

router.use("/books", require("./books"));

module.exports = router;