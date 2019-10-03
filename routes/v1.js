const express = require("express");
const router = express.Router();
const validation = require('../lib/validation');
const Customer = require('../models/customer');

router.post('/create-customer', (req, res) => {
    const data = Object.assign({}, req.body, {
        join: Date.now(),
        address: {
            ...req.body.address,
            zoneCode: `C1W1G1`
        }
    });
    console.log(data)
    const response = validation().createCustomer(data);
    if (response.isValid) {
        res.status(200).json(response);
    }else{
        res.status(400).json({
            error: true,
            message: response.description
        });
    }
});

module.exports = router;