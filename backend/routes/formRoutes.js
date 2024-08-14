const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Define the POST route for form submission
router.post('/contact', formController.submitContactForm);

// Define the GET route to fetch contact form data
router.get('/contact', formController.getContactForms);

module.exports = router;
