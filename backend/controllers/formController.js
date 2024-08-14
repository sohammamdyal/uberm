const Contact = require('../models/contact');

// Submit contact form
exports.submitContactForm = async (req, res) => {
    const { username, email, message } = req.body;

    // Basic validation
    if (!username || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new contact document
        const newContact = new Contact({ username, email, message });
        await newContact.save();

        // Send a success response
        res.status(200).json({ success: 'Message received' });
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get contact forms
exports.getContactForms = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching from database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
