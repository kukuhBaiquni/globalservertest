const express = require("express");
const cron = require("node-cron");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const RESPONSE_MESSAGE = require("../helpers/constant");
const imageFilter = require("../helpers/imageFilter");

const Customer = require("../models/customer");
const Product = require("../models/product");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images");
    },

    filename: function(req, file, cb) {
        const fileName = file.fieldname + "-" + Date.now()+ ".JPEG"
        req.fileName = fileName
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage, fileFilter: imageFilter }).single("photo");

router.get("/", (req, res) => {
    res.send("Hello");
});


router.get("/dump-data", async (req, res) => {
    try {
        const response = await Customer.find();
        const target = JSON.stringify(response, null, 3);
        const data = fs.writeFileSync("data.json", target);
        res.status(200).json({
            success: true,
            data
        });
    } catch(error) {
        res.status(400).json({
            success: false,
            error: "Error Tjug"
        });
    }
});

router.get("/download-json", (req, res) => {
    try {
        const file = "data.json";
        res.download(file)
    } catch(error) {
        res.status(500).json({
            success: false,
            error: "Error tjug"
        });
    }
});

router.get("/bulk-insert", (req, res) => {
    const target = path.join(__dirname, "../data.json");
    const data = JSON.parse(fs.readFileSync(target, "utf-8"));
    Customer.insertMany(data, (err, customer) => {
        res.json({ message: "OK!"});
    });
});

router.get("/estimate-order/:month/:year", async (req, res) => {
    // Transaction per month = 10;
    try {
        const targetMonth = req.params.month;
        const targetYear = req.params.year;
        let transaction = await Transaction.find({
            $and: [
                { "time.m": targetMonth },
                { "time.y": targetYear }
            ]
        });

    } catch(error) {
        res.status(500).json({
            error: "Error"
        });
    }
});

router.post("/new-customer", async (req, res) => {
    try {
        const newData = Object.assign({}, req.body, {
            join: Date.now(),
            address: {
                ...req.body.address,
                zoneCode: "C1W1D1"
            }
        });
        const newCustomer = new Customer(newData);
        const data = await newCustomer.save();
        res.status(201).json({
            success: true,
            data,
            message: RESPONSE_MESSAGE.ok_submit
        });
    }catch(error) {
        res.status(400).json({
            success: false,
            message: RESPONSE_MESSAGE.err_submit
        });
    }
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

router.get("/get-customer", async (req, res) => {
    try {
        const data = await Customer.find({}).sort({join: -1});
        res.status(200).json({
            success: true,
            data,
            message: RESPONSE_MESSAGE.ok_get_data
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGE.err_get_data
        });
    }
});

// router.put("/edit-customer", async (req, res) => {
//     try {
//         const incomingData = req.body
//     }
// });

router.post("/new-product", upload, async (req, res) => {
    try {
        const fileName = req.fileName;
        const newData = Object.assign({}, req.body, {
            photo: fileName
        });
        const newProduct = new Product(newData);
        const data = await newProduct.save();
        res.status(201).json({
            success: true,
            data,
            message: RESPONSE_MESSAGE.ok_submit
        });
    }catch(error) {
        res.status(400).json({
            success: false,
            message: RESPONSE_MESSAGE.err_submit
        });
    }
});

router.get("/get-products", async (req, res) => {
    try {
        const data = await Product.find({});
        res.status(200).json({
            success: true,
            data,
            message: RESPONSE_MESSAGE.ok_get_data
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGE.err_get_data
        });
    }
});

router.put("/edit-product/:productId", async (req, res) => {
    try {
        const price = req.body.price;
        const productId = req.params.productId;
        let target = await Product.findOne({productId});
        target.price = price;
        const data = await target.save();
        res.status(200).json({
            success: true,
            data,
            message: RESPONSE_MESSAGE.ok_update
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGE.err_update
        });
    }
});

router.delete("/delete-product/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const data = await Product.findOne({productId});
        const dir = path.join(__dirname, "../public/images/") + data.photo;
        await fs.unlinkSync(dir);
        await data.remove();
        res.status(200).json({
            success: true,
            data,
            message: RESPONSE_MESSAGE.ok_delete
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGE.err_delete
        });
    }
});

router.get("/get-district", async (req, res) => {
    try {
        const target = path.join(__dirname, "../kecamatanBandung.json");
        const data = JSON.parse(fs.readFileSync(target, "utf-8"));
        res.status(200).json({
            success: true,
            data,
            message: RESPONSE_MESSAGE.ok_get_data
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGE.err_get_data
        });
    }
});

router.get("/get-village/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const target = path.join(__dirname, "../kelurahanBandung.json");
        const data = JSON.parse(fs.readFileSync(target, "utf-8"));
        const filter = data.filter(x => x.kode_kecamatan === parseInt(id, 10));
        res.status(200).json({
            success: true,
            data: filter,
            message: RESPONSE_MESSAGE.ok_get_data
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: RESPONSE_MESSAGE.err_get_data
        });
    }
});

cron.schedule("* * * * *", () => {
  console.log(`test: ${new Date()}`);
});

module.exports = router;
