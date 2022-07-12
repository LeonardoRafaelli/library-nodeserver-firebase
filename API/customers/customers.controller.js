const express = require("express");
const router = express.Router();

const customersHandler = require("./customers.handler");

router.get("/", async (req, res) => {
    res.json(await customersHandler.getCustomers());
});

router.get("/:id", async (req, res) => {
    res.json(await customersHandler.getCustomerById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await customersHandler.saveCustomer(req.body));
});

router.patch("/:id", async (req, res) => {
    res.json(await customersHandler.updateCustomer(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.json(await customersHandler.removeCustomer(req.params.id));
});


module.exports = router;