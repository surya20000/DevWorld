const Media = require("../Models/Media");
const DevInfo = require("../Models/Developers");
const UserInfo = require("../Models/Users")


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

exports.getDev = async (req,res) => {
    try{
        const developer = await DevInfo.find();
        res.json(developer)
    }catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
}

// Creating media

exports.create = async (req, res) => {
    const { projectName, projectDescription, deployedLink } = req.body;
    let videosPaths = [];

    // Process uploaded videos
    if (req.files && req.files.videos && Array.isArray(req.files.videos) && req.files.videos.length > 0) {
        for (let video of req.files.videos) {
            videosPaths.push('/' + video.path);
        }
    }

    try {
        const createdMedia = await Media.create({
            projectName,
            projectDescription,
            deployedLink,
            videos: videosPaths,
        });

        res.json({ message: "Media added successfully", createdMedia });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// creating developer Info 

exports.devInfo = async (req, res) => {
    
    const { name, email, graduationDetails, password } = req.body

    try {
        const insertInfo = await DevInfo.create({
            name,
            email,
            graduationDetails,
            password
        })

        res.json({ message: "Info added successfully", insertInfo })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// create User

exports.createUser = async(req,res) => {
    const { name, email, password} = req.body
    
    try {
        const userInfo = await UserInfo.create({
            name,
            email,
            password
        })
        
        res.json({message:"User added successfully!!", userInfo})
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}