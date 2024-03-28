const Media = require("../Models/Media");
const DevInfo = require("../Models/Developers");
const UserInfo = require("../Models/Users")
const { ValidateDeveloper } = require('../DeveloperValidator')
const { mediaValidator } = require('../MediaValidator')
const { ValidateUser } = require('../UserValidator')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


// reading media data
exports.getall = async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// reading developer data

exports.getDev = async (req, res) => {
    try {
        const developer = await DevInfo.find();
        res.json(developer)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' })
    }
}

// Creating media

exports.create = async (req, res) => {
    const { error, value } = mediaValidator(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }

    const { email, projectName, projectDescription, deployedLink } = req.body;
    let videosPaths = [];

    // Process uploaded videos
    if (req.files && req.files.videos && Array.isArray(req.files.videos) && req.files.videos.length > 0) {
        for (let video of req.files.videos) {
            videosPaths.push('/' + video.path);
        }
    }

    try {
        // Create media with developer's email
        const createdMedia = await Media.create({
            email,
            projectName,
            projectDescription,
            deployedLink,
            videos: videosPaths,
        });

        res.json({ message: "Media added successfully", createdMedia });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Show Media at the time of update by Id

exports.showById =  (req, res) => {
    const id =  req.params.id
    Media.findById({ _id: id })
        .then(media => res.json(media))
        .catch(err => res.json({ "err": err }))
}


// Update the media data
exports.updateMedia = async (req, res) => {
    const id = req.params.id;
    const { projectName, projectDescription, deployedLink } = req.body;
    
    try {
        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }
        const userToken = token.split(' ')[1];
        const verifyUser = jwt.verify(userToken, process.env.secret);
        const user = await DevInfo.findOne({ _id: verifyUser._id });
        if (!user || media.email !== user.email) {
            return res.status(401).json({ message: "You are not the owner of the project!!" });
        }
        media.projectName = projectName;
        media.projectDescription = projectDescription;
        media.deployedLink = deployedLink;
        await media.save();
        res.json({ media, message: "Media updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all the data from the collections

exports.getAllMediaWithDeveloperInfo = async (req, res) => {
    try {
        const mediaList = await Media.find();
        const mediaWithDeveloperInfo = await Promise.all(mediaList.map(async (media) => {
            const developer = await DevInfo.findOne({ email: media.email });
            return { ...media.toObject(), developerInfo: developer };
        }));
        res.json(mediaWithDeveloperInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// creating developer Info 
exports.devInfo = async (req, res) => {
    const { error, value } = ValidateDeveloper(req.body)
    if (error) {
        console.log(error.details)
        return (res.status(400).json({ error: error.details }))
    }
    const { name, email, projectname, password } = req.body

    // password hashed

    try {

        const developer = new DevInfo({ name, email, password, projectname })
        const token = await developer.generateAuthToken();
        res.cookie("jwt", token).json({ message: "Info added successfully", developer, token })

        const userVerification = await jwt.verify(token, process.env.secret)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// create User

exports.createUser = async (req, res) => {

    const { error, value } = ValidateUser(req.body)
    if (error) {
        console.log((error.details));
        return res.status(400).json({ error: error.details });
    }

    const { name, email, password } = req.body

    try {
        const userInfo = await UserInfo.create({
            name,
            email,
            password
        })

        res.json({ message: "User added successfully!!", userInfo })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

// Show Media at the time of update by Id

exports.showById = async (req, res) => {
    const id = req.params.id
    // console.log(`JWT Cookie:${req.cookies.jwt}`)
    Media.findById({ _id: id })
        .then(media => res.json(media))
        .catch(err => res.json({ "err": err }))
}


// Update the media data

exports.updateMedia = async (req, res) => {
    const id = req.params.id
    Media.findByIdAndUpdate({ _id: id }, {
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        deployedLink: req.body.deployedLink,
        videos: req.body.videos
    })
        .then(media => res.json({ media, message: "Media Updated Succesfully" }))
        .catch(err => console.log(err))
}

// mediaController.js

exports.devInfoByEmail = async (req, res) => {
    const email = req.params.emailId;
    try {
        const developer = await DevInfo.findOne({ email });
        if (!developer) {
            return res.status(404).json({ message: "Developer not found" });
        }
        res.json(developer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}   


// login validation
exports.loginValidator = async (req, res) => {
    try {
        const { email, password } = req.body;
        const developer = await DevInfo.findOne({ email });
        const user = await UserInfo.findOne({ email });

        if (!developer && !user) {
            return res.status(400).send("User not found");
        }
        const userData = developer || user;
        const passwordMatches = await bcrypt.compare(password, userData.password);

        console.log(passwordMatches)
        if (passwordMatches) {
            const token = await userData.generateAuthToken();
            return res.status(200).send(token)
        } else {
            return res.status(400).send("Invalid login credentials");
        }
    } catch (error) {
        console.error("Error during login validation:", error);
        return res.status(500).send("Server Error");
    }
};