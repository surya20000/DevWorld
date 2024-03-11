const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    email:{
        type: String,
        trim:true
    },
    projectName: {
        type: String,
        trim:true
    },
    projectDescription: {
        type: String,
        trim:true
    },
    deployedLink: {
        type: String,
        trim:true
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