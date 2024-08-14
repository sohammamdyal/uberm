// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const { registerDriver, getDrivers, loginDriver } = require('../controllers/driverController');

router.post('/driver-register', registerDriver);
router.get('/drivers', getDrivers);
router.post('/driver-login', loginDriver);

module.exports = router;
