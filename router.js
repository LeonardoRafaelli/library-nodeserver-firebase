const express = require("express");
const router = express.Router();

const books             = require("./API/books/books.controller");
const customers         = require("./API/customers/customers.controller");
const authors           = require("./API/authors/authors.controller");
const publishers        = require("./API/publishers/publishers.controller");
const author_has_book   = require("./API/author_has_book/author_has_book.controller");
const rents             = require("./API/rents/rents.controller");

router.use("/books" ,           books);
router.use("/customers" ,       customers);
router.use("/authors",          authors);
router.use("/publishers",       publishers);
router.use("/author_has_book",  author_has_book);
router.use("/rents",            rents);

module.exports = router;