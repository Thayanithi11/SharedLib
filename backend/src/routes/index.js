const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

// Define routes
router.get('/', controller.home);
router.get('/about', controller.about);

// Export the router
module.exports = router;