// controllers/notificationController.js
const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
      // Assuming you fetch notifications from a database
      const allNotifications = await Notification.find(); // Adjust according to your database schema
      res.status(200).json(allNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const scheduleNotification = async (req, res) => {
    try {
      const { carRequestId, message, date, time } = req.body;
  
      // Validate the data
      if (!carRequestId || !message || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Add logic to schedule the notification (e.g., save to database)
      console.log(`Notification scheduled for ${carRequestId} with message: "${message}" on ${date} at ${time}`);
  
      res.status(201).json({ success: 'Notification scheduled' });
    } catch (error) {
      console.error('Error scheduling notification:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = { scheduleNotification, getNotifications };