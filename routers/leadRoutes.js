const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();

// user routes
router.post('/create-lead', userController.createLead);
router.post('/get-leads', userController.getAllLeads);

module.exports = router;
