// controllers/FeedbackController.js
const Feedback = require('../models/Feedback');
const { getNextSequenceValue } = require('../models/Counter');
exports.createFeedback = async (req, res) => {
  try {
    const nextId = await getNextSequenceValue('feedbackId');
    const newFeedback = new Feedback({
      id: nextId,
      email: req.body.email,
      feedback: req.body.feedback,
      rating: req.body.rating
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error: error.message });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/feedbackController.js



exports.deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    await Feedback.findByIdAndDelete(feedbackId);
    res.status(200).json({ message: 'Feedback removed successfully' });
  } catch (error) {
    console.error('Error removing feedback:', error);
    res.status(500).json({ error: 'Failed to remove feedback' });
  }
};
