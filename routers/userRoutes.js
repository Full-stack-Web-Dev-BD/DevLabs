const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();

// user routes
router.post('/create-lead', userController.createLead);

module.exports = router;
