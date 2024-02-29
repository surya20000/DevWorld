const mongoose = require('mongoose')

const DeveloperSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    graduationDetails: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = DevInfo = mongoose.model("developer", DeveloperSchema)