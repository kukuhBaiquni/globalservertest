const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");
const fs = require('fs');
const path = require('path');

router.post("/create-customer", (req, res) => {
    const data = Object.assign({}, req.body, {
        join: Date.now(),
        address: {
            ...req.body.address,
            zoneCode: 'C1W1D1'
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

router.delete("/mass-remove", (req, res) => {
    Customer.deleteMany({}, (err, ok) => {
        if (err) {
            res.status(500).json({
                success: false,
                error: err
            });
        }else{
            res.status(204).json({
                success: true
            });
        }
    });
});

router.get("/get-customer", (req, res) => {
    Customer.find().exec((err, customers) => {
        if (err) {
            res.status(500).json({
                success: false,
                error: err
            });
        }else{
            res.status(200).json({
                success: true,
                data: customers
            });
        }
    });
});

router.get("/dump-data", async (req, res) => {
    try {
        const response = await Customer.find();
        const target = JSON.stringify(response, null, 3);
        const data = fs.writeFileSync('data.json', target);
        res.status(200).json({
            success: true,
            data
        });
    } catch(error) {
        res.status(400).json({
            success: false,
            error: 'Error Tjug'
        })
    }
});

router.get("/download-json", (req, res) => {
    try {
        const file = 'data.json';
        res.download(file)
    } catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: 'Error tjug'
        });
    }
});

router.get("/bulk-insert", (req, res) => {
    const target = path.join(__dirname, '../data.json');
    const data = JSON.parse(fs.readFileSync(target, 'utf-8'));
    console.log(data);
    Customer.insertMany(data, (err, customer) => {
        res.json({ message: 'OK!'});
    });
});

module.exports = router;
