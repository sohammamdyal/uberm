const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route for sending messages
router.post('/', messageController.sendMessage);


module.exports = router;
