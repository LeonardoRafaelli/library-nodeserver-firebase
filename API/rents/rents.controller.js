const express = require("express");
const router = express.Router();

const rentsHandler = require("./rents.handler");

router.get("/", async (req, res) => {
    const rents = await rentsHandler.getRents();
    res.json({rents});
});

router.get("/:id", async (req, res) => {
    res.json(await rentsHandler.getRentByCustomerId(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await rentsHandler.saveRent(req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await rentsHandler.removeRentByCustomerId(req.params.id));
});


module.exports = router;