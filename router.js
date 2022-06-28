const express = require("express");
const router = express.Router();

const books = require("./api/books/books.controller");

router.use("/books" , books);

module.exports = router;