const User = require('../models/User');
const { sendEventToAll } = require('../server'); // Adjust the path if needed

// Controller for adding a new user
exports.addUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();

        // Send event to all connected clients
        sendEventToAll({ type: 'newUser', user: newUser });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller for getting all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
