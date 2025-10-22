const express = require('express');
const router = express.Router();
const {getCustomers} = require('../controllers/customerController')
const {verifyToken,authorizeRole} = require('../middleware/authMiddleware')



router.get('/getcustomers',verifyToken,authorizeRole('admin'),getCustomers)
module.exports = router;