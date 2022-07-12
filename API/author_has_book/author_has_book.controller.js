const express = require("express");
const router = express.Router();

const author_has_bookHandler = require("./author_has_book.handler");

router.get("/", async (req, res) => {
    res.json(await author_has_bookHandler.getAuthors_Books());
});

router.get("/book/:id", async (req, res) => {
    res.json(await author_has_bookHandler.getBookAuthorsByBookId(req.params.id));
});

router.get("/author/:id", async (req, res) => {
    res.json(await author_has_bookHandler.getAuthorBooksByAuthorId(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await author_has_bookHandler.saveAuthorHasBook(req.body));
});

router.patch("/:id", async (req, res) => {
    res.json(await author_has_bookHandler.updateAuthorHasBook(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await author_has_bookHandler.removeAuthorHasBook(req.params.id));
});


module.exports = router;