const express = require('express');
const router = express.Router();
const {addHotel,getAllHotels,getVerifiedHotels,getUnVerifiedHotels,getHotelById,
       getHotelByType,getHotelbyCity,gethotelsbystate} = require('../controllers/hotelController');
const {verifyToken,authorizeRole} = require('../middleware/authMiddleware')

router.post('/addhotel',verifyToken,authorizeRole('owner'),addHotel);
router.get('/getallhotels',verifyToken,authorizeRole('admin'),getAllHotels);
router.get('/getunverifiedhotels',verifyToken,authorizeRole('admin'),getUnVerifiedHotels);
router.get('/getverifiedhotels',verifyToken,authorizeRole('admin','customer'),getVerifiedHotels);
router.get('/gethotelbyid/:id',verifyToken,authorizeRole('admin'),getHotelById);
router.get('/gethotelbytype/:hoteltype',verifyToken,authorizeRole('customer','admin'),getHotelByType);
router.get('/getbycity/:city',verifyToken,authorizeRole('customer','admin'),getHotelbyCity)
router.get('/gethotelbystate/:state',verifyToken,authorizeRole('admin','customer'),gethotelsbystate)

module.exports = router