const mongoose = require('mongoose')

const DeveloperSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    projectname: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = DevInfo = mongoose.model("developer", DeveloperSchema)