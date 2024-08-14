// controllers/CarRequestController.js
const CarRequest = require('./../models/CarRequest');

// controllers/carRequestController.js



exports.createCarRequest = async (req, res) => {
  try {
    const { id, name, amount, pickupLocation, destinationLocation, driverName, plateNumber, image } = req.body;

    // Basic validation
    if (!id || !name || !amount || !pickupLocation || !destinationLocation || !driverName || !plateNumber) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newRequest = new CarRequest({ id, name, amount, pickupLocation, destinationLocation, driverName, plateNumber, image });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating car request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




exports.getCarRequests = async (req, res) => {
  try {
    const carRequests = await CarRequest.find({});
    res.json(carRequests);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Failed to fetch car requests', details: error.message });
  }
};

