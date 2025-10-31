const express = require('express');
const router = express.Router();
const {
  addHotel,
  getAllHotels,
  getVerifiedHotels,
  getUnVerifiedHotels,
  getHotelById,
  getHotelByType,
  getHotelbyCity,
  gethotelsbystate,
  filterByPrice
} = require('../controllers/hotelController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management APIs
 */

/**
 * @swagger
 * /api/hotel/getallhotels:
 *   get:
 *     summary: Get all hotels
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description: Successfully fetched all hotels
 *       500:
 *         description: Server error
 */
router.get('/getallhotels', verifyToken, authorizeRole('admin'), getAllHotels);

/**
 * @swagger
 * /api/hotel/gethotelbyid/{id}:
 *   get:
 *     summary: Get hotel by ID
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hotel data retrieved
 *       404:
 *         description: Hotel not found
 */
router.get('/gethotelbyid/:id', verifyToken, authorizeRole('admin'), getHotelById);

/**
 * @swagger
 * /api/hotel/addhotel:
 *   post:
 *     summary: Add Hotel With Owner ID
 *     tags: 
 *       - Hotels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: Hotel Created Successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server Error    
 *         
 */
router.post('/addhotel', verifyToken, authorizeRole('owner'), addHotel);
/**
 * @swagger
 * api/hotel/getunverifiedhotels:
 *   get:
 *     summary: Get Unverified Hotels
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description: Successfully fetched All Unverified Hotels
 *       500:
 *         description: Server Error
 */
router.get('/getunverifiedhotels', verifyToken, authorizeRole('admin'), getUnVerifiedHotels);
/**
 * @swagger
 * /api/hotel/getverifiedhotels:
 *   get:
 *     summary: Get Verified Hotels
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description : Successfully Fetched All Verified Hotels
 *       500:
 *         description: Server Error
 */
router.get('/getverifiedhotels', verifyToken, authorizeRole('admin', 'customer'), getVerifiedHotels);

/**
 * @swagger
 * /api/hotel/gethotelbytype/{hoteltype}:
 *   get:
 *     summary: Get Hotels by HotelType
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: hoteltype
 *         required: true
 *         description: Type of the Hotel to retreive
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hotels for given type fetched
 *       404:
 *         description: Hotels Not Found on this type
 *       500:
 *         description: server error
 */
router.get('/gethotelbytype/:hoteltype', verifyToken, authorizeRole('customer', 'admin'), getHotelByType);
/**
 * @swagger
 * /api/hotel/getbycity/{city}:
 *   get:
 *     summary: Get Hotel By City
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: city of hotel to retreive
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hotels Fetched Successfully
 *       404:
 *         description: No Hotels Found
 *       500:
 *         description: Server Error
 */
router.get('/getbycity/:city', verifyToken, authorizeRole('customer', 'admin'), getHotelbyCity);

/**
 * @swagger
 * /api/hotel/gethotelbystate/{state}:
 *   get:
 *     summary: Get Hotels by State
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type:string
 *     responses:
 *       200:
 *         description: Hotels for state found successfully
 *       404:
 *         description: Hotels not found
 *       500:
 *         description: Server Error 
 */
router.get('/gethotelbystate/:state', verifyToken, authorizeRole('admin', 'customer'), gethotelsbystate);

module.exports = router;
