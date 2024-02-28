const express = require('express');
const mediaController = require('../controllers/mediaController')


const router = express.Router();
// get all Data
router.get('/all', mediaController.getall)


module.exports = router