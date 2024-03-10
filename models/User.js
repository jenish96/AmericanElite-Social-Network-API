const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String
        },
        profile_url: {
            type: String
        },
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model("users", schema);