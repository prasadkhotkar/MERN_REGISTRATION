const express = require('express');
const {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Registration route with profile picture upload
router.post('/register', upload.single('profilePicture'), registerUser);

// Login route
router.post('/login', authUser);

// Get user profile
router.get('/user/:id', authMiddleware, getUserProfile);

// Update user profile with profile picture upload
router.put('/user/:id', authMiddleware, upload.single('profilePicture'), updateUserProfile);

router.post('/upload', authMiddleware, upload.single('profilePicture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({
        message: "Profile picture uploaded successfully",
        profilePictureUrl: req.file.path
    });
});

module.exports = router;
