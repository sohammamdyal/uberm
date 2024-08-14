// controllers/driverController.js
const Driver = require('./../models/driver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Existing registerDriver method
const JWT_SECRET ="sdhgfhsdfgsdkfsdkjfhsdjfhs976758576djfhsdjkfsdkfsdfgsdhfgsdfgsdf7685<>?:khdfsdfsdfsd";

exports.registerDriver = async (req, res) => {
    const { name, email, password, carmodel, phone, platenumber, experience } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDriver = new Driver({
            name,
            email,
            password: hashedPassword,
            carmodel,
            phone,
            platenumber,
            experience
        });

        await newDriver.save();
        res.status(201).json({ status: 'ok', message: 'Driver registered successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};


exports.loginDriver = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);

    try {
        // Find the driver by email
        const driver = await Driver.findOne({ email });
        if (!driver) {
            console.log("User not found");
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        // Check if the provided password matches the hashed password
        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(400).json({ status: 'error', error: 'Invalid credentials' });
        }

        // Assuming you want to use sessions or another method for authentication
        req.session.driverId = driver._id; // Store driver's ID in session

        console.log("Login successful");
        res.status(200).json({ status: 'ok', message: 'Login successful' });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ status: 'error', error: error.message });
    }
};

exports.getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({});
        res.status(200).json(drivers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
