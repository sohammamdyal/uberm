// models/driver.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    carmodel: { type: String, required: true },
    phone: { type: String, required: true },
    platenumber: { type: String, required: true },
    experience: { type: String, required: true }
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
