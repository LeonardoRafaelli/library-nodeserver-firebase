const express = require("express");
const router = express.Router();

const authorsHandler = require("./authors.handler");

router.get("/", async (req, res) => {
    res.json( await authorsHandler.getAuthors());
});

router.get("/:id", async (req, res) => {
    res.json(await authorsHandler.getAuthorById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await authorsHandler.saveAuthor(req.body));
});

router.patch("/:id", async (req, res) => {
    res.json(await authorsHandler.updateAuthor(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await authorsHandler.removeAuthor(req.params.id));
});


module.exports = router;