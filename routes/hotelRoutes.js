const express = require('express');
const router = express.Router();
const {addHotel,getAllHotels,getVerifiedHotels,getUnVerifiedHotels,getHotelById} = require('../controllers/hotelController');
const {verifyToken,authorizeRole} = require('../middleware/authMiddleware')

router.post('/addhotel',verifyToken,authorizeRole('owner'),addHotel);
router.get('/getallhotels',verifyToken,authorizeRole('admin'),getAllHotels);
router.get('/getunverifiedhotels',verifyToken,authorizeRole('admin'),getUnVerifiedHotels);
router.get('/getverifiedhotels',verifyToken,authorizeRole('admin'),getVerifiedHotels);
router.get('/gethotelbyid/:id',verifyToken,authorizeRole('admin'),getHotelById);

module.exports = router