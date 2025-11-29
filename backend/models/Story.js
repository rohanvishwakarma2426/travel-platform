const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Story", storySchema);

