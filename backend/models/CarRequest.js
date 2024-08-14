// models/CarRequest.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarRequestSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String, // Ensure this is correct, as the error mentions type casting
    required: true,
  },
  pickupLocation: {
    type: Object, // Change from String to Object
    required: true,
  },
  destinationLocation: {
    type: Object, // Change from String to Object
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, // Optional
  },
});

module.exports = mongoose.model('CarRequest', CarRequestSchema);
