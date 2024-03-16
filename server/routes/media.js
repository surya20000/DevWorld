const express = require('express');
const mediaController = require('../controllers/mediaController')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("public")) {
            fs.mkdirSync("public");
        }

        if (!fs.existsSync("public/videos")) {
            fs.mkdirSync("public/videos");
        }

        cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname)

        if (ext != ".mkv" && ext !== ".mp4") {
            return cb(new Error("Only videos are allowed"))
        }

        cb(null, true);
    }
})

const router = express.Router();
// get all Data
router.get('/all', mediaController.getall)

//update Data
router.put('/updateMedia/:id', mediaController.updateMedia)

// get DevelopersData
router.get('/allDev', mediaController.getDev)

//post data

router.post('/create', upload.fields([
    {
        name: "videos"
    }
]), mediaController.create)


// post Developers Info

router.post('/devInfo', mediaController.devInfo)

// enter user data

router.post('/createUser', mediaController.createUser)

// login  validation

router.post('/login', mediaController.loginValidator)

module.exports = router