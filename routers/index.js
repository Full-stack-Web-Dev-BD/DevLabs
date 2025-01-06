const express = require('express');
const leadRoutes = require('./leadRoutes');      // Importing auth-related routes

const router = express.Router();

// Mount each router to a specific path
router.use('/lead', leadRoutes);        

module.exports = router;