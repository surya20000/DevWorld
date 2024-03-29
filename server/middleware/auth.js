const jwt = require("jsonwebtoken");
const DevInfo = require('../Models/Developers');

const auth = async (req, res, next) => {
    // console.log(req.headers);
    try {
        if (!req.headers['authorization']) {
            return res.status(401).send("Authorization header is missing");
        }
        const token1 = req.headers['authorization'];
        const getToken = token1.split(' ');
        const userToken = getToken[1];
        // console.log(userToken);
        const verifyUser = jwt.verify(userToken, process.env.secret);
        // console.log(verifyUser);
        const user = await DevInfo.findOne({ _id: verifyUser._id });
        // console.log("User email:", user.email);
        next();
    } catch (error) {
        console.log("Error msg:", error.message);
        res.status(401).send(error);
    }
}

module.exports = auth;