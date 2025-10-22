const express = require('express');
const router = express.Router();
const {getOwner,getVerifiedOwner,getUnVerifiedOwner,getOwnerById} = require('../controllers/onwerController')
const {verifyToken,authorizeRole} = require('../middleware/authMiddleware')

router.get('/getallowners',verifyToken,authorizeRole('admin'),getOwner);
router.get('/getverifiedowner',verifyToken,authorizeRole('admin'),getVerifiedOwner);
router.get('/getunverifiedowner',verifyToken,authorizeRole('admin'),getUnVerifiedOwner)
router.get('/getownerbyid/:id',verifyToken,authorizeRole('admin'),getOwnerById)

module.exports = router;