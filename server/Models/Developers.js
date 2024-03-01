const mongoose = require('mongoose')

const DeveloperSchema = new mongoose.Schema({
    name: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    },
    graduationDetails: {
        type: String,
        require
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = DevInfo = mongoose.model("developer", DeveloperSchema)