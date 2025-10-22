const express = require('express');
const router = express.Router();
const{verifyOwner} = require('../controllers/adminController');
const {verifyToken,authorizeRole} = require('../middleware/authMiddleware')


router.post('/ownerverify/:id',verifyToken,authorizeRole('admin'),verifyOwner)

module.exports = router;