// routes/carRequestRoutes.js
const express = require('express');
const router = express.Router();
const CarRequestController = require('../controllers/CarRequestController');

router.post('/requestCab', CarRequestController.createCarRequest);
router.get('/carRequests', CarRequestController.getCarRequests);
module.exports = router;
