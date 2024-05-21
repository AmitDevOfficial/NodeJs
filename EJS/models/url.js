const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }]
},{ timestamps: true})

const URL = mongoose.model("url", userSchema);

module.exports = URL;