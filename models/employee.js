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
    birth: {
        type: Number,
        default: 0
    },
    identityNumber: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Employee", employee);