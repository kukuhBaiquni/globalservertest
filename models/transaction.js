const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transaction = new Schema({
    customerData: {
        id: String,
        name: String,
        phone: String,
        address: {
            street: String,
            province: String,
            city: String,
            district: String,
            village: String,
            zoneCode: String,
            coordinates: {
                latitude: Number,
                longitude: Number
            }
        }
    },
    date: Number,
    group: String,
    cashier: {
        id: String,
        name: String,
        level: String,
    },
    instance: [{
        productId: Number,
        productName: String,
        price: Number,
        qty: Number,
        photo: String
    }],
    status: {
        type: String,
        enum: ["1", "2", "3"] // 1: "Pending", 2: "Process", 3: "Success"
    },
    amount: {
        type: Number
    },
    paymentType: {
        type: String,
        enum: ["0", "1"] // 0: "Credit", 1: "Cash"
    },
    note: String
});

module.exports = mognoose.model('Transaction', transaction);
