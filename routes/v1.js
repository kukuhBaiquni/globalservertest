const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

router.post("/create-customer", (req, res) => {
    const data = Object.assign({}, req.body, {
        join: Date.now(),
        address: {
            ...req.body.address,
            zoneCode: "C1W1G1"
        }
    });
    const newCustomer = new Customer(data);
    newCustomer.save((err, customer) => {
        if (err) {
            res.status(400).json({
                success: false,
                error: err
            });
        } else {
            res.status(201).json({
                success: true,
                data: customer
            });
        }
    });
});

router.delete()

module.exports = router;
