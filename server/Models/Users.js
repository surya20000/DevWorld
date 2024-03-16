const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }],
    password: {
        type: String,
        trim: true
    }
})


UserSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.secret);
    this.tokens = this.tokens.concat({ token })
    await this.save();
    return token;
}

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            console.log(`Current password: ${this.password}`);
            this.password = await bcrypt.hash(this.password, 10);
            console.log(`Hashed password: ${this.password}`);
        } catch (error) {
            console.error("Error hashing password:", error);
            next(error);
        }
    }
    next();
})


module.exports = UserInfo = mongoose.model("users", UserSchema)