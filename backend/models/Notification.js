// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  carRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'CarRequest', required: true },
  message: { type: String, required: true },
  date: { type: String, required: true }, // or Date type if storing a full Date object
  time: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
