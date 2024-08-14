const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Driver = require('./driver');
const Ride = require('../models/Ride');

const router = express.Router();

// Middleware to check if the user is a driver
const isDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.user.id);
    if (!driver) {
      return res.status(401).json({ message: 'User is not a driver' });
    }
    req.driver = driver;
    next();
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get driver profile
router.get('/profile', auth, isDriver, async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id).select('-password');
    res.json(driver);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update driver availability
router.post('/availability', auth, isDriver, async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    driver.available = req.body.available;
    await driver.save();
    res.json(driver);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get pending rides
router.get('/rides', auth, isDriver, async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'pending' });
    res.json(rides);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Accept ride
router.post('/rides/:id/accept', auth, isDriver, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (ride.status !== 'pending') {
      return res.status(400).json({ message: 'Ride is not available for acceptance' });
    }
    ride.status = 'accepted';
    ride.driver = req.driver.id;
    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Reject ride
router.post('/rides/:id/reject', auth, isDriver, async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (ride.status !== 'pending') {
      return res.status(400).json({ message: 'Ride is not available for rejection' });
    }
    ride.status = 'rejected';
    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
