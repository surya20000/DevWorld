const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    projectName: {
        type: String,
        require
    },
    projectDescription: {
        type: String,
        require
    },
    deployedLink: {
        type: String,
        require
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