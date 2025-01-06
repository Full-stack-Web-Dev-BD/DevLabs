const express = require('express');
const authRoutes = require('./userRoutes');      // Importing auth-related routes
const productRoutes = require('./productRoutes');      // Importing auth-related routes
const qrRoutes = require('./qrRoutes');      
const upload = require('../controllers/uploadController');      
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Mount each router to a specific path
router.use('/auth', authRoutes);        
router.use('/product', productRoutes);        
router.use('/qr', qrRoutes);        
router.post('/upload',authMiddleware,upload.uploadImage );        

module.exports = router;