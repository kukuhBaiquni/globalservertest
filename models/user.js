const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
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
    userName: {
        type: String,
        match: /^[a-zA-Z0-9 ]+$/,
        required: true,
        minlength: 6,
        trim: true
    },
    password: {
        type: String,
        match: /^[a-zA-Z0-9]+$/,
        required: true,
        minlength: 8,
        trim: true
    },
    level: {
        type: String,
        enum: ["0", "1"],
        required: true
    }
});