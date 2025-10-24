const express = require('express');
const router  = express.Router();
const{verifyToken,authorizeRole} = require('../middleware/authMiddleware')
const {AddRoom,GetRooms} = require('../controllers/roomController');

router.post('/addroom/:id',verifyToken,authorizeRole('owner'),AddRoom);
router.get('/getallrooms',verifyToken,authorizeRole('admin'),GetRooms);

module.exports = router;