const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = new Schema({
    firstName: String,
    lastName: String,
    join: Number,
    address: {
        street: String,
        province: String,
        city: String,
        district: String,
        village: String,
        zone: String,
        path: String,
        coordinates: {
            latitude: { type: Number, default: 0 },
            longitude: { type: Number, default: 0 }
        },
        zoneCode: String
    },
    phone: String
});

module.exports = mongoose.model('Customer', customer);