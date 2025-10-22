const express = require('express');
const router = express.Router();
const {addHotel} = require('../controllers/hotelController');
const {verifyToken,authorizeRole} = require('../middleware/authMiddleware')

router.post('/addhotel',verifyToken,authorizeRole('owner'),addHotel);

module.exports = router