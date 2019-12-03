const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
    productId: String,
    productName: String,
    photo: String,
    price: Number,
    unitType: String,
    unitSize: Number,
});

module.exports = mongoose.model("Product", product);
