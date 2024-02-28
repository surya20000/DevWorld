const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    projectName: {
        type: String,
    },
    projectDescription: {
        type: String,
    },
    deployedLink: {
        type: String,
    },
    videos: [{
        type: String,
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Media = mongoose.model("project", MediaSchema);