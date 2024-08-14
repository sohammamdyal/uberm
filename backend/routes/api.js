
// routes/api.js
const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/FeedbackController');

router.post('/feedback', FeedbackController.createFeedback);
router.get('/feedbacks', FeedbackController.getAllFeedbacks);
router.delete('/:id', FeedbackController.deleteFeedback);

router.delete('/feedbacks/:id', FeedbackController.deleteFeedback);

module.exports = router;