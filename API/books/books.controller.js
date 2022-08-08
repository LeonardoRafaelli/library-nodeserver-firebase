const express = require("express");
const router = express.Router();

const booksHandler = require("./books.handler");

router.get("/", async (req, res) => {
    const books = await booksHandler.getBooks();
    res.json(books);
});

router.get("/rented", async (req, res) => {
    res.json(booksHandler.getRentedBooks());
});

router.get("/:id", async (req, res) => {
    res.json(await booksHandler.getBookById(req.params.id));
});

// {
//     "name": "123",
//     "number_pages": 123,
//     "publisher_id": "123",
//     "authors": ["123", "123"]
// }

router.post("/", async (req, res) => {
    res.json(await booksHandler.saveBook(req.body));
});

router.patch("/:id", async (req, res) => {
    res.json(await booksHandler.updateBook(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await booksHandler.removeBook(req.params.id));
});


module.exports = router;