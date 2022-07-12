const express = require("express");
const router = express.Router();

const publishersHandler = require("./publishers.handler");

router.get("/", async (req, res) => {
    res.json(await publishersHandler.getPublishers());
});

router.get("/:id", async (req, res) => {
    res.json(await publishersHandler.getPublisherById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await publishersHandler.savePublisher(req.body));
});

router.patch("/:id", async (req, res) => {
    res.json(await publishersHandler.updatePublisher(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await publishersHandler.removePublisher(req.params.id));
});


module.exports = router;