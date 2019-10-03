const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transaction = new Schema({
    userId: String,
    date: Number,
    time: {
        d: Number,
        m: Number,
        y: Number
    },
    instance: {
        productId: Number,
        price: Number,
        quantity: Number
    }
});

module.exports = mognoose.model('Transaction', transaction);