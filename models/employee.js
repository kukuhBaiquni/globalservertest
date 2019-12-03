const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee = ({
    firstName: {
        type: String,
        match: /^[a-zA-Z ]+$/,
        minLength: 3,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        match: /^[a-zA-Z ]+$/,
        minlength: 3,
        required: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9. /]+$/,
            trim: true
        },
        province: {
            type: String,
            required: true,
            match: /^[a-zA-Z ]+$/,
            trim: true,
            default: "Jawa Barat"
        },
        city: {
            type: String,
            required: true,
            match: /^[a-zA-Z ]+$/,
            trim: true,
            default: "Bandung"
        },
        district: {
            type: String,
            required: true,
            match: /^[a-zA-Z ]+$/,
            trim: true,
            enum: districtLevel
        },
        village: {
            type: String,
            required: true,
            match: /^[a-zA-Z ]+$/,
            trim: true,
            enum: villageLevel
        }
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]+$/,
        minlength: 10,
        maxlength: 13
    },
    identityNumber: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        default: "0",
        enum: ["0", "1", "10"] // 0: operator/admin, 1: leader/superadmin, 10: owner
    }
});

module.exports = mongoose.model("Employee", employee);
