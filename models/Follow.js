const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        followerId: {
            type: String,
            required: true
        },
        followeeId: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Follow", schema); 