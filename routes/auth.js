const express = require('express');

const router = express.Router();
const authController = require('../controller/auth/auth');


router.post('/otp', authController.createOtp);
router.post('/verify', authController.verifyOtp);

module.exports = router;