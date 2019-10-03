const express = require("express");
const router = express.Router();
const validation = require('../lib/validation');

router.post('/create-customer', async (req, res) => {
    const response = await validation().createCustomer(req.body);
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