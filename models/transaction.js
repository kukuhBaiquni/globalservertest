const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transaction = new Schema({
    userId: String,
    date: Number,
    instance: [{
        productId: Number,
        price: Number,
        quantity: Number
    }],
    status: {
        type: String,
        enum: ["1", "2", "3"] // 1: "Pending", 2: "Process", 3: "Success"
    },
    sales: {
        type: String
    },
    payment: {
        type: String,
        enum: ["0", "1"] // 0: "Credit", 1: "Cash"
    }
});

module.exports = mognoose.model('Transaction', transaction);