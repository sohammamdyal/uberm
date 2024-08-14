const Message = require('../models/Message');

// Save a new message
exports.saveMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const newMessage = new Message({ message });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};

// Fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
exports.sendMessage = async (req, res) => {
  const { message } = req.body;
  // Implement your logic for sending messages, e.g., send email or SMS
  console.log('Message to be sent:', message); // Placeholder for actual sending logic

  res.status(200).json({ success: true, message: 'Message sent successfully' });
};
