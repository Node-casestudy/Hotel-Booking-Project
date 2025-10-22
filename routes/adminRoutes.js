const express = require('express');
const router = express.Router();
const{verifyOwner,verifyHotel} = require('../controllers/adminController');
const {verifyToken,authorizeRole} = require('../middleware/authMiddleware')


router.post('/ownerverify/:id',verifyToken,authorizeRole('admin'),verifyOwner);
router.post('/hotelverification/:id',verifyToken,authorizeRole('admin'),verifyHotel);

module.exports = router;