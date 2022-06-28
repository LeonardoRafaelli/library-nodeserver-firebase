const express = require("express");
const router = express.Router();

const booksHandler = require("./books.handler");

router.get("/", (req, res) => {
    res.json(booksHandler.getBooks());
});

// router.patch("/")

router.post("/", (req, res) => {
    res.json("booksHandler.saveBook(req.body)");
});


module.exports = router;