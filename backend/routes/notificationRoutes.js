const express = require('express');
const router = express.Router();
const { getNotifications, scheduleNotification } = require('../controllers/notificationController');

// Route to get notifications
router.get('/', getNotifications);

// Route to schedule a notification
router.post('/notifications', scheduleNotification);

module.exports = router;
