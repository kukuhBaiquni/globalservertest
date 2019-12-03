const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");
const rawDataVillage = fs.readFileSync("kelurahanBandung.json", "utf-8");
const realDataVillage = JSON.parse(rawDataVillage);
const villageLevel = realDataVillage.map(x => x.nama_kelurahan);
const rawDataDistrict = fs.readFileSync("kecamatanBandung.json", "utf-8");
const realDataDistrict = JSON.parse(rawDataDistrict);
const districtLevel = realDataDistrict.map(x => x.nama_kecamatan);

const customer = new Schema({
    firstName: {
        type: String,
        match: /^[a-zA-Z ]+$/,
        minlength: 3,
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
    join: {
        type: Number,
        default: Date.now()
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"]
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
        },
        zone: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9 ]+$/,
            trim: true
        },
        path: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9 ]+$/,
            trim: true
        },
        coordinates: {
            latitude: { type: Number, default: 0 },
            longitude: { type: Number, default: 0 }
        },
        zoneCode: {
            type: String,
            required: true,
            match: /^[A-Z0-9 ]+$/
        }
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]+$/,
        minlength: 10,
        maxlength: 13
    },
    defaultOrderPattern: [0],
    defaultAverageOrder: {
        type: Number,
        default: 0
    },
    customAverageOrder: {
        type: Number,
        default: 0
    },
    manualAverageOrder: {
        type: Number,
        default: 0
    },
    group: {
        type: String,
        default: "CB1"
    },
    estimatedNextOrder: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Customer", customer);
