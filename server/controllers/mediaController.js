const Media = require("../Models/Media");


exports.getall = async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};