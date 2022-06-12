const mongoose = require('mongoose');

const argonautSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        type: String,
        required: false,
        unique: false
    },
    },
    { timestamps: true }
);

const Argonaut = mongoose.model("argonaut", argonautSchema);

module.exports = Argonaut;

