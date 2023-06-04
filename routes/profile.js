const express = require('express');
const router = express.Router();
const authController = require('../controller/auth/auth');
const profileController = require('../controller/profile/profile');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads')   
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)      
    }
})
const upload = multer({ storage: storage });


router.get('/profile', authController.auth, profileController.getProfile);
router.put('/profile', authController.auth, upload.any(), profileController.updateProfile);

module.exports = router;