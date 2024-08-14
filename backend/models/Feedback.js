const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  }
});

// Create a model using the schema
module.exports = mongoose.model('Feedback', feedbackSchema);
